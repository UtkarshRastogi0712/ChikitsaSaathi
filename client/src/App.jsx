import { useEffect, useContext } from 'react';
import React from 'react';
import './App.css';
import Login from './components/Login';
import Logout from './components/Logout';
import Sidebar from './components/Sidebar';
import { UserContext } from './providers/UserProvider';
import { gapi } from 'gapi-script';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from 'react-router-dom';
import routes from 'virtual:generated-pages-react';

function AppRoutes() {
  const routing = useRoutes(routes);
  return routing;
}

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
            {user ? (
              <div className="w-full">
                <p>Welcome, {user.name}</p>
                <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
                <Logout /> {/* Include Logout button */}
              </div>
            ) : (
              <Login />
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
        <AppRoutes /> 
      </React.Suspense>
    </Router>
  );
}

export default App;
