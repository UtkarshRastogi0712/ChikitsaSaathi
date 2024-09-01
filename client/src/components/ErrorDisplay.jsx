import React from 'react';
import { useError } from '../providers/ErrorProvider'; // Adjust path if necessary

const ErrorDisplay = () => {
  const { errors } = useError();

  return (
    <div className="fixed bottom-0 right-0 m-4 space-y-2">
      {errors.map((error, index) => (
        <div
          key={index}
          className={`p-4 rounded shadow-md text-white ${
            error.type === 'error'
              ? 'bg-red-500'
              : error.type === 'warning'
              ? 'bg-yellow-500'
              : error.type === 'success'
              ? 'bg-green-500'
              : 'bg-gray-500'
          }`}
        >
          {error.message}
        </div>
      ))}
    </div>
  );
};

export default ErrorDisplay;
