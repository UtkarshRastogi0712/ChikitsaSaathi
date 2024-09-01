import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function BedAvail() {
  const [hospitalData] = useState([
    {
      _id: '1',
      name: 'SRM',
      location: {
        coordinates: [77.5946, 12.9716],
      },
      bedTypes: {
        ICU: {
          capacity: 10,
          availableCapacity: 5,
          serviceRate: 1.2,
          arrivalRate: 0.8,
          dischargeRate: 0.6,
        },
        General: {
          capacity: 50,
          availableCapacity: 20,
          serviceRate: 1.0,
          arrivalRate: 1.0,
          dischargeRate: 0.5,
        },
        Emergency: {
          capacity: 15,
          availableCapacity: 7,
          serviceRate: 1.5,
          arrivalRate: 1.2,
          dischargeRate: 0.7,
        },
      },
    },
    {
      _id: '2',
      name: 'Apollo',
      location: {
        coordinates: [80.2707, 13.0827],
      },
      bedTypes: {
        ICU: {
          capacity: 8,
          availableCapacity: 3,
          serviceRate: 1.0,
          arrivalRate: 0.6,
          dischargeRate: 0.4,
        },
        General: {
          capacity: 40,
          availableCapacity: 10,
          serviceRate: 1.1,
          arrivalRate: 1.2,
          dischargeRate: 0.4,
        },
        Emergency: {
          capacity: 20,
          availableCapacity: 5,
          serviceRate: 1.3,
          arrivalRate: 1.1,
          dischargeRate: 0.5,
        },
      },
    },
  ]);

  return (
    <div className="p-6 h-screen flex flex-wrap gap-8 overflow-auto">
      {Array.isArray(hospitalData) && hospitalData.length > 0 ? (
        hospitalData.map((hospital) => (
          <Card key={hospital._id} className="flex flex-col p-6 shadow-lg rounded-lg border border-gray-200 bg-white flex-shrink-0 w-full sm:w-2/3 lg:w-1/2 xl:w-1/3">
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
