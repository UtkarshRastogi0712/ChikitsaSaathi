import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making API requests
import { Card, CardHeader, CardContent } from '@/components/ui/card'; // Adjust import paths if necessary
import { Badge } from '@/components/ui/badge'; // Adjust import paths if necessary

function BedAvail() {
  const [hospitalData, setHospitalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hospital data from the API
  useEffect(() => {
    async function fetchHospitalData() {
      try {
        const response = await axios.get('http://localhost:8000/hospitals/'); // Replace with your API endpoint
        console.log('API Response:', response.data); // Log the data
        setHospitalData(response.data);
      } catch (err) {
        console.error('Failed to fetch hospital data', err); // Log the error
        setError('Failed to fetch hospital data');
      } finally {
        setLoading(false);
      }
    }

    fetchHospitalData();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>; // Centered loading indicator
  }

  if (error) {
    return <div className="text-center text-red-500 text-lg">{error}</div>;
  }

  return (
    <div className="p-6 h-full w-full flex flex-wrap gap-8 overflow-auto">
      {Array.isArray(hospitalData) && hospitalData.length > 0 ? (
        hospitalData.map((hospital) => (
          <Card key={hospital._id} className="flex flex-col p-6 shadow-lg rounded-lg border border-gray-200 bg-white flex-shrink-0 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <CardHeader className="border-b border-gray-300 pb-4">
              <h2 className="text-2xl font-bold text-gray-800">{hospital.name}</h2>
              <p className="text-gray-600">{`${hospital.location.coordinates.join(', ')}`}</p>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {Object.keys(hospital.bedTypes).map((bedType) => {
                const bedInfo = hospital.bedTypes[bedType];
                return (
                  <div key={bedType} className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold text-gray-700">{bedType} Beds</h3>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-gray-50">
                        <h4 className="font-medium text-gray-700">Total Capacity</h4>
                        <p className="text-xl font-bold text-gray-900">{bedInfo.capacity}</p>
                      </div>
                      <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-gray-50">
                        <h4 className="font-medium text-gray-700">Available</h4>
                        <p className="text-xl font-bold text-green-600">{bedInfo.availableCapacity}</p>
                      </div>
                      <div className="flex-1 p-4 border border-gray-300 rounded-lg bg-gray-50">
                        <h4 className="font-medium text-gray-700">Occupied</h4>
                        <p className="text-xl font-bold text-red-600">
                          {bedInfo.capacity - bedInfo.availableCapacity}
                        </p>
                      </div>
                    </div>
                    <Badge className="mt-4 bg-blue-500 text-white">
                      {bedInfo.availableCapacity} Beds Available
                    </Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center text-lg">No hospital data available</div>
      )}
    </div>
  );
}

export default BedAvail;
