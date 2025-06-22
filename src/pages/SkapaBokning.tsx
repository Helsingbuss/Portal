import React from 'react';

const SkapaBokning: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl px-10 py-12 max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Skapa bokning</h1>
        <p className="text-gray-600">Här kommer formuläret för att skapa en ny bokning.</p>
      </div>
    </div>
  );
};

export default SkapaBokning;
