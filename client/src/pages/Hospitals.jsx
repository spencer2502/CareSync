import React, { useState, useEffect } from 'react';

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState([
    {
      id: 1,
      name: "Apollo Hospitals",
      status: "Open",
      hours: "24/7",
      location: { lat: 40.712776, lng: -74.005974 },
      address: "123 Main Street, New York, NY 10001",
      specialties: ["Cardiology", "Neurology", "Oncology"]
    },
    {
      id: 2,
      name: "Parvathy Hospital",
      status: "Open",
      hours: "8AM - 10PM",
      location: { lat: 40.728776, lng: -74.015974 },
      address: "456 Park Avenue, New York, NY 10002",
      specialties: ["Pediatrics", "Orthopedics", "General Surgery"]
    },
    {
      id: 3,
      name: "Kauvery Hospital",
      status: "Open",
      hours: "24/7",
      location: { lat: 40.722776, lng: -73.995974 },
      address: "789 Broadway, New York, NY 10003",
      specialties: ["Emergency Care", "Trauma", "Internal Medicine"]
    },
    {
      id: 4,
      name: "City General Hospital",
      status: "Open",
      hours: "24/7",
      location: { lat: 40.732776, lng: -74.025974 },
      address: "101 Lexington Ave, New York, NY 10004",
      specialties: ["Women's Health", "Cardiac Care", "Diagnostics"]
    }
  ]);

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [activeTab, setActiveTab] = useState('information');

  
  const MapComponent = () => {
    useEffect(() => {
      
      console.log("Map initialized with hospitals:", hospitals);
      
    }, []);

    return (
      <div id="map" className="relative w-full h-full min-h-screen">
        <img src="/api/placeholder/1200/800" alt="Map showing hospital locations" className="w-full h-full object-cover" />
        
        
        <div className="absolute inset-0 bg-blue-900 opacity-10"></div>
        
        
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
          <div className="flex flex-col">
            <button className="p-2 hover:bg-gray-100 rounded mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
        
        
        {hospitals.map((hospital, index) => (
          <div key={hospital.id} className={`absolute ${getMarkerPosition(index)}`}>
            <div 
              className={`h-8 w-8 bg-blue-900 rounded-full shadow-md flex items-center justify-center cursor-pointer ${selectedHospital === hospital.id ? 'ring-4 ring-blue-300' : ''}`}
              onClick={() => setSelectedHospital(hospital.id)}
            >
              <div className="h-4 w-4 bg-white rounded-full"></div>
              <div className="absolute -inset-1 bg-blue-500 rounded-full animate-ping opacity-50"></div>
            </div>
          </div>
        ))}
        
        
        {selectedHospital && (
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-blue-900">{hospitals.find(h => h.id === selectedHospital).name}</h3>
              <button onClick={() => setSelectedHospital(null)} className="text-gray-500 hover:text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <p className="text-gray-600 text-sm mt-1">{hospitals.find(h => h.id === selectedHospital).address}</p>
            <div className="flex items-center mt-2">
              <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{hospitals.find(h => h.id === selectedHospital).status}</div>
              <span className="text-gray-500 text-xs ml-2">{hospitals.find(h => h.id === selectedHospital).hours}</span>
            </div>
            <button className="mt-3 w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition-colors">
              Get Directions
            </button>
          </div>
        )}
        
        
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
          <div className="flex items-center mb-2">
            <div className="h-4 w-4 bg-blue-900 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700">Hospital Location</span>
          </div>
          <div className="flex items-center">
            <div className="h-4 w-4 bg-green-600 rounded-full mr-2"></div>
            <span className="text-sm text-gray-700">Emergency Care</span>
          </div>
        </div>
      </div>
    );
  };


  const getMarkerPosition = (index) => {
    const positions = [
      'top-1/4 left-1/3',
      'top-1/2 left-1/2',
      'bottom-1/4 right-1/3',
      'bottom-1/3 left-1/4'
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="min-h-screen w-screen bg-gray-100">
     
      <div className="w-full bg-white shadow-md">
        <div className="w-full px-6 py-6">
          <h1 className="text-4xl font-bold text-blue-900">Hospitals</h1>
          <p className="text-gray-600 mt-2">Find and connect with hospitals in your area</p>
        </div>
      </div>
      
      
      <div className="w-full px-0">
        <div className="w-full bg-white shadow-lg">
         
          <div className="border-b border-gray-200">
            <div className="flex px-6">
              <button 
                className={`flex items-center justify-center px-6 py-4 font-medium ${activeTab === 'information' ? 'border-b-2 border-blue-900 text-blue-900' : 'text-gray-500 hover:text-blue-800'}`}
                onClick={() => setActiveTab('information')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                Information
              </button>
              <button 
                className={`flex items-center justify-center px-6 py-4 font-medium ${activeTab === 'contacts' ? 'border-b-2 border-blue-900 text-blue-900' : 'text-gray-500 hover:text-blue-800'}`}
                onClick={() => setActiveTab('contacts')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                Contacts
              </button>
              <button 
                className={`flex items-center justify-center px-6 py-4 font-medium ${activeTab === 'services' ? 'border-b-2 border-blue-900 text-blue-900' : 'text-gray-500 hover:text-blue-800'}`}
                onClick={() => setActiveTab('services')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                Services
              </button>
            </div>
          </div>
          
          
          <div className="flex flex-col lg:flex-row w-full">
           
            <div className="w-full lg:w-1/4 border-r border-gray-200">
              <div className="p-6">
                <div className="mb-4">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search hospitals..." 
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-400">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 overflow-y-auto max-h-screen pb-6">
                  {hospitals.map(hospital => (
                    <div 
                      key={hospital.id}
                      className={`bg-white rounded-xl p-4 border transition-all duration-300 hover:shadow-md cursor-pointer ${selectedHospital === hospital.id ? 'border-blue-500 shadow-md' : 'border-gray-200'}`}
                      onClick={() => setSelectedHospital(hospital.id)}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#0c4a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                            <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
                            <line x1="12" y1="8" x2="12" y2="16"></line>
                            <line x1="8" y1="12" x2="16" y2="12"></line>
                          </svg>
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-medium text-blue-900 text-lg">{hospital.name}</h3>
                          <p className="text-gray-500 text-sm mt-1">{hospital.address}</p>
                          <div className="flex items-center mt-2">
                            <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{hospital.status}</div>
                            <span className="text-gray-500 text-xs ml-2">{hospital.hours}</span>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-1">
                            {hospital.specialties.map((specialty, index) => (
                              <span key={index} className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full py-3 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 transition-colors duration-300 flex items-center justify-center">
                    <span>View All Hospitals</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
           
            <div className="w-full lg:w-3/4">
              <MapComponent />
            </div>
          </div>
          
         
          <div className="bg-gray-50 p-6 border-t border-gray-200 w-full">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-gray-500 text-sm">Showing {hospitals.length} of 24 hospitals in your area</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  Filter
                </button>
                <button className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
                  </svg>
                  Find Nearest
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}