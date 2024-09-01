import React from 'react';

const SettingsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl w-full bg-white p-6 rounded-lg shadow-lg h-full overflow-y-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Settings
        </h1>

        {/* Account Settings */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Account Settings
          </h2>
          <div className="space-y-4">
            <button className="w-full p-4 bg-gray-200 rounded-lg text-left text-gray-700 hover:bg-gray-300">
              Change Password
            </button>
            <button className="w-full p-4 bg-gray-200 rounded-lg text-left text-gray-700 hover:bg-gray-300">
              Update Email
            </button>
            <button className="w-full p-4 bg-gray-200 rounded-lg text-left text-gray-700 hover:bg-gray-300">
              Manage Subscriptions
            </button>
          </div>
        </div>

        {/* Support and Feedback */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Support and Feedback
          </h2>
          <div className="space-y-4">
            <button className="w-full p-4 bg-gray-200 rounded-lg text-left text-gray-700 hover:bg-gray-300">
              Contact Support
            </button>
            <button className="w-full p-4 bg-gray-200 rounded-lg text-left text-gray-700 hover:bg-gray-300">
              Submit Feedback
            </button>
            <button className="w-full p-4 bg-gray-200 rounded-lg text-left text-gray-700 hover:bg-gray-300">
              Report a Bug
            </button>
          </div>
        </div>

        {/* Miscellaneous */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Miscellaneous
          </h2>
          <div className="space-y-4">
            <button className="w-full p-4 bg-gray-200 rounded-lg text-left text-gray-700 hover:bg-gray-300">
              Privacy Policy
            </button>
            <button className="w-full p-4 bg-gray-200 rounded-lg text-left text-gray-700 hover:bg-gray-300">
              Terms of Service
            </button>
            <button className="w-full p-4 bg-gray-200 rounded-lg text-left text-gray-700 hover:bg-gray-300">
              App Version: 1.0.0
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
