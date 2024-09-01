import { useEffect, useContext } from 'react';
import React from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Sidebar from './components/Sidebar';
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
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 p-6 flex items-center justify-center">
            <Routes>
              <Route path="/" element={user ? <div>Welcome, {user.name} <Logout /></div> : <Login />} />
              <Route path="/home" element={<div>Home Content</div>} />
              <Route path="/settings" element={<div>Settings Content</div>} />
              <Route path="/bed-availability" element={<div>Bed Availability Content</div>} />
            </Routes>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      </React.Suspense>
    </Router>
  );
}

export default App;
