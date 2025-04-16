import React, { useState } from "react";

const Request_ = () => {
  const [isEmergencyAccessible, setIsEmergencyAccessible] = useState(false);
  
  return (
    <div className="min-h-screen h-screen flex flex-col bg-gray-900 w-full">
      <div className="bg-gray-100 w-full flex-grow overflow-auto">
        <div className="bg-white p-4 md:p-6 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6">Request Records</h1>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h2 className="text-lg font-medium text-blue-900 mb-4">Request Form</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor ID <span className="text-gray-500 text-xs">(optional)</span>
                </label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter doctor ID if applicable"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter request title"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Record Type <span className="text-red-500">*</span>
              </label>
              <select 
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select record type</option>
                <option value="medical">Medical Records</option>
                <option value="financial">Financial Documents</option>
                <option value="legal">Legal Records</option>
                <option value="personnel">Personnel Files</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center">
                <label className="block text-sm font-medium text-gray-700 mr-2">
                  Emergency Access <span className="text-red-500">*</span>
                </label>
                <div 
                  className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ${isEmergencyAccessible ? "bg-blue-600" : "bg-gray-200"}`}
                  onClick={() => setIsEmergencyAccessible(!isEmergencyAccessible)}
                >
                  <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" checked={isEmergencyAccessible} readOnly />
                  <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
                <span className="text-sm text-gray-500">{isEmergencyAccessible ? "Yes" : "No"}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Files
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                      <span>Upload files</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, JPG, PNG up to 10MB
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-all">
                Cancel
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-md hover:shadow-md transition-all">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request_;