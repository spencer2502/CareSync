import React from "react";

const Request = () => {
    return (
          <div className="min-h-screen h-screen flex flex-col bg-gray-900 w-full">
            <div className="bg-gray-100 w-full flex-grow overflow-auto">
              <div className="bg-white p-4 md:p-6 shadow-sm">
                <h1 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6">Request Records</h1>
                
                <div className="flex flex-wrap items-center justify-between mb-6">
                  <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
                    <button className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-blue-900 hover:bg-blue-50 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      My Requests
                    </button>
                    
                    <button className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-900 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      Search
                    </button>
                    
                    <button className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-900 transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                      Clear
                    </button>
                  </div>
                  
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-md text-sm font-medium hover:shadow-md transition-all flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New Request
                  </button>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
                  <h2 className="text-lg font-medium text-blue-900 mb-4">Request Form</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Record Type</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Medical Records</option>
                        <option>Financial Documents</option>
                        <option>Legal Records</option>
                        <option>Personnel Files</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Standard (5-7 days)</option>
                        <option>Urgent (2-3 days)</option>
                        <option>Emergency (24 hours)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                      rows="4"
                      placeholder="Please describe what records you need and why..."
                    ></textarea>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <input 
                          type="date" 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <span className="text-gray-500">to</span>
                      <div className="flex-1">
                        <input 
                          type="date" 
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
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
                
                <div className="mb-4">
                  <h2 className="text-lg font-medium text-blue-900 mb-4">Recent Requests</h2>
                </div>
                
                <div className="flex flex-col space-y-4 overflow-y-auto">
                  {/* Request 1 */}
                  <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex justify-center mr-4 bg-gray-50 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900 text-lg">Medical Records Request</h3>
                        <p className="text-sm text-gray-500">Submitted on April 8, 2025</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      In Progress
                    </span>
                  </div>
                  
                  {/* Request 2 */}
                  <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex justify-center mr-4 bg-gray-50 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900 text-lg">Financial Documents</h3>
                        <p className="text-sm text-gray-500">Submitted on April 2, 2025</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      Completed
                    </span>
                  </div>
                  
                  {/* Request 3 */}
                  <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex justify-center mr-4 bg-gray-50 p-3 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-blue-900 text-lg">Personnel Files</h3>
                        <p className="text-sm text-gray-500">Submitted on March 26, 2025</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Denied
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
    );
};

export default Request;
