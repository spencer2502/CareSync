export default function RecordsPage() {
  return (
    <div className="min-h-screen h-screen flex flex-col bg-gray-900 w-full">
      <div className="bg-gray-100 w-full flex-grow overflow-auto">
        <div className="bg-white p-4 md:p-6 shadow-sm">
          <h1 className="text-2xl md:text-3xl font-semibold text-blue-900 mb-6">Records</h1>
          
          <div className="flex flex-wrap items-center justify-between mb-6">
            <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
              <button className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-blue-900 hover:bg-blue-50 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                  <line x1="4" y1="6" x2="20" y2="6"></line>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                  <line x1="4" y1="18" x2="20" y2="18"></line>
                </svg>
                List
              </button>
              
              <button className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-900 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Filter
              </button>
              
              <button className="flex items-center justify-center px-3 py-2 bg-white border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-blue-50 hover:text-blue-900 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
                12 Days
              </button>
            </div>
            
            <button className="px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-md text-sm font-medium hover:shadow-md transition-all flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Upload Document
            </button>
          </div>
          
          <div className="flex flex-col space-y-4 overflow-y-auto">
            {/* Record 1 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center">
              <div className="flex justify-center mr-4 bg-gray-50 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="font-medium text-blue-900 text-lg">Record 1</h3>
            </div>
            
            {/* Record 2 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center">
              <div className="flex justify-center mr-4 bg-gray-50 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="font-medium text-blue-900 text-lg">Record 2</h3>
            </div>
            
            {/* Record 3 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center">
              <div className="flex justify-center mr-4 bg-gray-50 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="font-medium text-blue-900 text-lg">Record 3</h3>
            </div>
            
            {/* Record 4 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center">
              <div className="flex justify-center mr-4 bg-gray-50 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="font-medium text-blue-900 text-lg">Record 4</h3>
            </div>
            
            {/* Record 5 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center">
              <div className="flex justify-center mr-4 bg-gray-50 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="font-medium text-blue-900 text-lg">Record 5</h3>
            </div>
            
            {/* Record 6 */}
            <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center">
              <div className="flex justify-center mr-4 bg-gray-50 p-3 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="font-medium text-blue-900 text-lg">Record 6</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}