import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  QrCode as QrCodeIcon,
  Download,
  Copy,
  AlertCircle,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

// Utility function to create a random string for QR value
function getRandomString(length = 12) {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let str = '';
  for (let i = 0; i < length; i++)
    str += chars[Math.floor(Math.random() * chars.length)];
  return str;
}

const QrCodePage = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [qrValue, setQrValue] = useState(null);
  const [hasEmergencyRecords, setHasEmergencyRecords] = useState(true);
  const [recordCount, setRecordCount] = useState(0);
  const [emergencyUrl, setEmergencyUrl] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get patient ID from auth context or local storage
  // Replace this with your actual auth system implementation
  const patientId = localStorage.getItem('userId') || '3EL4TIAZ';

  // NOTE: These axios routes are added but not called, as requested
  // Check if patient has emergency records route
  const checkEmergencyRecords = async () => {
    try {
      const response = await axios.get(
        `/api/records/${patientId}/emergency-count`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setRecordCount(response.data.count);
      setHasEmergencyRecords(response.data.count > 0);
    } catch (error) {
      setHasEmergencyRecords(false);
      console.error('Error checking emergency records:', error);
      toast({
        title: 'Error',
        description: 'Failed to check emergency records',
        variant: 'destructive',
      });
    }
  };

  // Generate QR code route
  const generateQrCodeFromApi = async () => {
    try {
      // Call your backend API to generate the QR code
      const response = await axios.get(
        `/api/patients/${patientId}/emergency-qr`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        setQrCode(response.data.qrCodeImage);
        setEmergencyUrl(response.data.emergencyUrl);

        toast({
          title: 'QR code generated',
          description: 'Your emergency QR code is ready to use',
        });
      } else {
        toast({
          title: 'Error',
          description: response.data.message || 'Failed to generate QR code',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: 'Error',
        description:
          error.response?.data?.message ||
          'There was a problem generating your QR code',
        variant: 'destructive',
      });
    }
  };

  const handleGenerateQR = () => {
    setIsGenerating(true);

    // Create a new random value/string for the QR
    const newQrValue = getRandomString(16);

    // Use a free QR code API for demo: https://goqr.me/api/
    // Since it's a demo, you can use the value in the QR. In a real app, you'd use secure APIs.
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(
      newQrValue
    )}`;

    // Simulate async QR code generation
    setTimeout(() => {
      setIsGenerating(false);
      setQrCode(qrUrl);
      setQrValue(newQrValue);
      setEmergencyUrl(`https://caresync.example.com/emergency/${newQrValue}`);

      toast({
        title: 'QR code generated',
        description: 'Your emergency QR code is ready to use',
      });
    }, 1200);
  };

  const handleDownload = () => {
    if (!qrCode) return;

    // Download the QR image shown
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'caresync-emergency-qr.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: 'QR code downloaded',
      description: 'Your emergency QR code has been saved',
    });
  };

  const handleCopy = async () => {
    // For demo: copy the QR data string, not the image
    if (qrValue) {
      await navigator.clipboard.writeText(qrValue);
      toast({
        title: 'QR code copied',
        description: 'The QR data has been copied to clipboard',
      });
    } else {
      toast({
        title: 'Unable to copy',
        description: 'Please generate a QR code first.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardLayout title="Emergency QR Code">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Emergency Medical Access</CardTitle>
            <CardDescription>
              Generate a QR code that emergency responders can scan to access
              your critical medical information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="caresync-3d-element">
                {qrCode ? (
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-primary/10 rounded-lg transform rotate-3 animate-pulse-light"></div>
                    <img
                      src={qrCode}
                      alt="Emergency QR Code"
                      className="w-64 h-64 mx-auto border-4 border-white shadow-lg rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="w-64 h-64 mx-auto bg-gray-100 rounded-lg flex items-center justify-center border-4 border-white shadow-lg">
                    <QrCodeIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {qrCode && emergencyUrl && (
                <div className="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600 break-all">
                  <p className="mb-1 font-medium">Emergency Access URL:</p>
                  <p>{emergencyUrl}</p>
                </div>
              )}

              {qrCode ? (
                <div className="flex justify-center space-x-4">
                  <Button onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Button variant="outline" onClick={handleCopy}>
                    <Copy className="mr-2 h-4 w-4" /> Copy
                  </Button>
                </div>
              ) : (
                <Button onClick={handleGenerateQR} disabled={isGenerating}>
                  {isGenerating ? 'Generating...' : 'Generate QR Code'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="caresync-3d-card">
            <CardHeader>
              <CardTitle className="text-lg">Fast Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Emergency responders can quickly access your critical medical
                information.
              </p>
            </CardContent>
          </Card>

          <Card className="caresync-3d-card">
            <CardHeader>
              <CardTitle className="text-lg">Privacy Controlled</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                You control exactly what information is visible during
                emergencies.
              </p>
            </CardContent>
          </Card>

          <Card className="caresync-3d-card">
            <CardHeader>
              <CardTitle className="text-lg">Always Available</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Print it, save it to your phone, or share it with family
                members.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QrCodePage;
