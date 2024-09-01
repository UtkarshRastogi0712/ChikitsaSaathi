import { useEffect, useContext } from 'react';
import React from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Sidebar from './components/Sidebar';
import BedAvail from './pages/BedAvail';
import addPatient from './pages/addPatient';
import { UserContext } from './providers/UserProvider';
import { gapi } from 'gapi-script';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const { user, setUser, error, setError } = useContext(UserContext);

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
          <div className="flex-1 p-4 ">
            <Routes>
              <Route path="/" element={user ? <div className="flex flex-col items-center">Welcome, {user.name} <Logout /></div> : <Login />} />
              <Route path="/home" element={<div>Home Content</div>} />
              <Route path="/settings" element={<div>Settings Content</div>} />
              <Route path="/bed-availability" element={<BedAvail />} />
              <Route path="/patient-dashboard" element={<addPatient/>} />
            </Routes>
            {error && <p className="text-red-500 mt-4">{error}</p>}
          </div>
        </div>
      </React.Suspense>
    </Router>
  );
}

export default App;
