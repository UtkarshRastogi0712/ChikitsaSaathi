import React from 'react';
import backgroundImage from '@/assets/image.png';

const Home = () => {
  return (
    <div className="relative flex h-screen items-center justify-center bg-gray-100 p-6">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      ></div>
      <div className="relative text-center max-w-3xl bg-white bg-opacity-80 p-8 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to Automated OPD Queuing and Management System
        </h1>
        <p className="text-2xl text-gray-600">
          Fast and efficient bed allocation system
        </p>
      </div>
    </div>
  );
};

export default Home;
