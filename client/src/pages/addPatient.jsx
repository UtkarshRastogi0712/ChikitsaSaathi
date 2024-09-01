import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardFooter, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { Alert } from '@/components/ui/alert';
import { useError } from '@/providers/ErrorProvider';
import DynamicBarChart from '@/components/DynamicBarChart';

const PatientDashboard = () => {
  const [users, setUsers] = useState([]);
  const [hospitalData, setHospitalData] = useState({});
  const { addError, errors } = useError();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data || []);
      calculateHospitalData(response.data || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
      addError('Failed to fetch users');
    }
  };

  const calculateHospitalData = (users) => {
    const data = users.reduce((acc, user) => {
      user.patientHistory?.forEach((history) => {
        if (history.hospitalName) {
          acc[history.hospitalName] = (acc[history.hospitalName] || 0) + 1;
        }
      });
      return acc;
    }, {});
    setHospitalData(data);
  };

  const hospitalLabels = Object.keys(hospitalData);
  const hospitalCounts = Object.values(hospitalData);

  // Data for the hospital chart
  const hospitalChartData = hospitalLabels.map(hospital => ({
    hospitalName: hospital,
    count: hospitalData[hospital],
  }));

  // Hardcoded data for initial testing
  const hardcodedData = [
    { month: "January", count: 15 },
    { month: "February", count: 30 },
    { month: "March", count: 25 },
    { month: "April", count: 10 },
    { month: "May", count: 35 },
    { month: "June", count: 20 },
  ];

  const chartConfig = {
    count: {
      label: "Patients",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="p-6 max-w-5xl mx-auto overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">Patient Dashboard</h1>

      {/* Error Alert */}
      {errors.length > 0 && (
        <Alert variant="destructive" className="mb-4">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </Alert>
      )}

      {/* Total Patients Card */}
      <Card className="mb-4">
        <CardHeader>
          <h2 className="text-2xl font-bold">Total Patients</h2>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">{users.length}</p>
        </CardContent>
      </Card>

      {/* Charts Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Patients per Hospital Bar Graph */}
        <DynamicBarChart
          title="Patients per Hospital"
          description="Patient data by hospital"
          data={hospitalChartData}
          dataKey="count"
          config={chartConfig}
          footer={{
            message: "Patient count distributed across hospitals",
            subtext: "Showing patient data for different hospitals",
          }}
          xAxisKey="hospitalName" // Use hospitalName for x-axis
        />

        {/* Monthly Patient Count Bar Graph */}
        <DynamicBarChart
          title="Monthly Patient Count"
          description="Patient data from January to June"
          data={hardcodedData}
          dataKey="count"
          config={chartConfig}
          footer={{
            message: "Patient count trend over the first half of the year",
            subtext: "Showing patient data from January to June",
          }}
          xAxisKey="month" // Use month for x-axis
        />
      </div>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold">Patient Overview</h2>
        </CardHeader>
        <CardContent>
          {users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Aadhaar Number</TableCell>
                  <TableCell>Patient History</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.aadhaarNumber}</TableCell>
                    <TableCell>
                      {user.patientHistory?.length > 0 ? (
                        user.patientHistory.map((history, index) => (
                          <div key={index}>
                            <p>{history.hospitalName}</p>
                            <p>{history.description}</p>
                          </div>
                        ))
                      ) : (
                        <p>No history available</p>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No patients found</p>
          )}
        </CardContent>
        <CardFooter>
          <p>Total Patients: {users.length}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PatientDashboard;
