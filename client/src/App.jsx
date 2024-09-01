import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Sidebar from './components/Sidebar';
import ErrorDisplay from './components/ErrorDisplay';
import BedAvail from './pages/BedAvail';
import AddPatient from './pages/AddPatient';
import { UserContext } from './providers/UserProvider';
import { useError } from './providers/ErrorProvider';
import { gapi } from 'gapi-script';
import Home from './pages/Home';
import SettingsPage from './pages/Settings';

function App() {
  const { user } = useContext(UserContext);
  const { errors } = useError(); // Use the error context

  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id: import.meta.env.VITE_CLIENT_ID,
        scope: ""
      });
    }
    gapi.load('client:auth2', start);
  }, []);

  console.log(user);

  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar className="w-64 h-full" />
          <div className="flex-1 p-4 overflow-y-auto ">
            <Routes>
              <Route path="/" element={user ? <div className="flex flex-col items-center">Welcome, {user.name} <Logout /></div> : <Login />} />
              <Route path="/home" element={<Home/>} />
              <Route path="/settings" element={<SettingsPage/>} />
              <Route path="/bed-availability" element={<BedAvail />} />
              <Route path="/patient-dashboard" element={<AddPatient />} />
            </Routes>
            {/* ErrorDisplay component to show errors globally */}
            <ErrorDisplay />
          </div>
        </div>
      </React.Suspense>
    </Router>
  );
}

export default App;
