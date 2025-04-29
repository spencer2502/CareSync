import accessControlModel from '../models/accessModel.js';
import recordModel from '../models/recordModel.js';
import userModel from '../models/userModel.js';
import { logAccess } from '../utils/auditLogger.js';
import { logAccessEvent } from '../utils/blockchainLogger.js';

export const getUserData = async (req, res) => {
  try {
    const userId = req.user?.id; // from the JWT token
    console.log('Decoded user ID:', userId);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified.toString(),
        id: user._id.toString(),
      },
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export const getAllRequests = async (req, res) => {
  try {
    const userId = req.user.id; // corrected userId assignment;
    const requests = await accessControlModel.find({ patient: userId });
    if (!requests.length) {
      return res.json({ success: false, message: 'No records found' });
    }

    res.json({
      success: true,
      records: requests,
    });
  } catch (error) {
    console.error('Error updating record access:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
export const acceptRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const request = await accessControlModel.findById(requestId);
    if (!request) {
      return res.json({ success: false, message: 'Request not found' });
    }
    request.request = true;
    await request.save();
    res.json({
      success: true,
      message: 'Request accepted',
    });
  } catch (error) {
    console.error('Error updating record access:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


export const getUserRecords = async (req, res) => {
  try {
    const userId = req.user?.id; // pulled from JWT
    console.log('Decoded user ID:', userId);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    const records = await recordModel.find({ uploadedBy: userId });
    if (!records.length) {
      return res.json({ success: false, message: 'No records found' });
    }

    // Log access for each record viewed in the blockchain
    for (const record of records) {
      await logAccessEvent('user', userId, record._id.toString(), 'view');
    }

    res.json({
      success: true,
      records: records,
    });
  } catch (error) {
    console.error('Error fetching user records:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const rejectRequest = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { requestId } = req.body;

    const request = await accessControlModel.findById(requestId);
    if (!request) {
      return res.json({ success: false, message: 'Request not found' });
    }

    // Verify this request belongs to the current user
    if (request.patient.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to reject this request",
      });
    }

    // Instead of deleting, mark as rejected
    request.request = false;
    request.rejected = true;
    await request.save();

    // Log the request rejection for audit purposes
    await logAccess({
      actorId: userId,
      actorRole: 'patient',
      action: 'reject_request',
      recordId: request._id,
      additionalInfo: { requestId: requestId, doctorId: request.doctor },
      ipAddress: req.ip,
    });

    // Log to blockchain
    await logAccessEvent(
      'patient',
      userId,
      request._id.toString(),
      'deny_access'
    );

    res.json({
      success: true,
      message: 'Request rejected',
    });
  } catch (error) {
    console.error('Error rejecting access request:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getSingleRecord = async (req, res) => {
  try {
    const userId = req.user?.id;
    const recordId = req.params.id;

    if (!recordId) {
      return res.status(400).json({
        success: false,
        message: 'Record ID is required',
      });
    }

    const record = await recordModel
      .findById(recordId)
      .populate('doctor', 'name specialization');

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Record not found',
      });
    }

    // Verify this record belongs to the current user
    if (record.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to view this record",
      });
    }

    // Log the access
    await logAccess({
      actorId: userId,
      actorRole: 'patient',
      action: 'view_detail',
      recordId: record._id,
      ipAddress: req.ip,
    });

    // Log to blockchain
    await logAccessEvent(
      'patient',
      userId,
      record._id.toString(),
      'view_detail'
    );

    res.json({
      success: true,
      record: record,
    });
  } catch (error) {
    console.error('Error fetching record:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

export const revokeAccess = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { accessId } = req.body;

    const access = await accessControlModel.findById(accessId);
    if (!access) {
      return res.status(404).json({
        success: false,
        message: 'Access grant not found',
      });
    }

    // Verify this access belongs to the current user
    if (access.patient.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You don't have permission to revoke this access",
      });
    }

    // Revoke by setting request back to false and expiring the access
    access.request = false;
    access.expiresAt = new Date(); // Expire immediately
    await access.save();

    // Log the access revocation
    await logAccess({
      actorId: userId,
      actorRole: 'patient',
      action: 'revoke_access',
      recordId: null,
      additionalInfo: { accessId: accessId, doctorId: access.doctor },
      ipAddress: req.ip,
    });

    // Log to blockchain
    await logAccessEvent(
      'patient',
      userId,
      access._id.toString(),
      'revoke_access'
    );

    res.json({
      success: true,
      message: 'Access successfully revoked',
    });
  } catch (error) {
    console.error('Error revoking access:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
