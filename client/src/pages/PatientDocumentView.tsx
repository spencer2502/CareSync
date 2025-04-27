import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { AppContext } from '@/context/appContext';

const PatientDocumentView = () => {
  const { id } = useParams<{ id: string }>(); // Get the record ID from the URL params
  const navigate = useNavigate();
  const [pdfPath, setPdfPath] = useState<string | null>(null); // Store the PDF URL
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const { backendUrl} = useContext(AppContext); 

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const baseUrl = backendUrl.endsWith('/') ? backendUrl : `${backendUrl}/`;
        setLoading(true); // Set loading to true while fetching the document
        const response = await axios.get(`${backendUrl}/api/user/getRecord/${id}`, {
          withCredentials: true, // Ensure credentials are sent with the request (if needed)
        });

        if (response.data.success) {
          const documentUrl = response.data.record.attachments[0]?.fileUrl; // Adjust based on response structure
          if (documentUrl) {
            setPdfPath(documentUrl); // Set the document URL
          } else {
            setError('No document found for this record.');
          }
        } else {
          setError(response.data.message || 'Failed to fetch document.');
        }
      } catch (err) {
        setError('Error fetching document: ' + err.message);
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };

    if (id) {
      fetchDocument();
    }
  }, [id]); // Dependency array ensures the effect runs when the id changes

  return (
    <DashboardLayout title="View Document">
      <div className="mb-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </div>

      <div className="w-full h-[80vh] flex justify-center items-center bg-gray-100 rounded-lg overflow-hidden">
        {loading ? (
          <div>Loading document...</div> // Display loading state
        ) : error ? (
          <div className="text-red-500">{error}</div> // Display error message if any
        ) : pdfPath ? (
          <iframe
            src={pdfPath}
            title="Patient Document PDF"
            className="w-full h-full rounded-lg bg-white border"
          />
        ) : (
          <div>No document available.</div> // Fallback if no document URL is found
        )}
      </div>

      <div className="text-center text-sm text-gray-400 mt-2">
        {loading
          ? 'Loading...'
          : "This is the patient's document being viewed."}
      </div>
    </DashboardLayout>
  );
};

export default PatientDocumentView;
