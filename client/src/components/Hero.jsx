import React from 'react';

export default function Hero() {
  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="w-full bg-white rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-blue-900/5 rounded-bl-full"></div>
          
          <div className="flex items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-semibold">
              <span className="text-blue-900">Care</span>
              <span className="text-green-500">Sync</span>
            </h1>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* User Card */}
            <div className="bg-white border-solid border-indigo-700 rounded-xl p-6 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-blue-900 font-medium text-lg">User</h3>
            </div>
            
            {/* Records Card */}
            <div className="bg-white border-solid border-indigo-700 rounded-xl p-6 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="text-blue-900 font-medium text-lg">Records</h3>
            </div>
            
            {/* Review Card */}
            <div className="bg-white border-solid border-indigo-700 rounded-xl p-6 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                </svg>
              </div>
              <h3 className="text-blue-900 font-medium text-lg">Review</h3>
            </div>
            
            {/* History Card */}
            <div className="bg-white border-solid border-indigo-700 rounded-xl p-6 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="text-blue-900 font-medium text-lg">History</h3>
            </div>
            
            {/* Hospitals Card */}
            <div className="bg-white border-solid border-indigo-700 rounded-xl p-6 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-blue-900 font-medium text-lg">Hospitals</h3>
            </div>
            
            {/* Emergency Card */}
            <div className="bg-white border-solid border-indigo-700 rounded-xl p-6 flex flex-col items-center justify-center h-40 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                  <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="text-blue-900 font-medium text-lg">Emergency</h3>
            </div>
          </div>
          
          {/* Help Card - Full Width */}
          <div className="mt-6 bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-6 flex flex-col items-center justify-center h-32 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/20 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
            </div>
            <h3 className="text-white font-medium text-lg">Help</h3>
          </div>
        </div>
      </div>
    </div>
  );
}