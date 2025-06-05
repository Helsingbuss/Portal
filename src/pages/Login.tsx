import React from "react";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="logo" className="h-12" />
        </div>
        <h1 className="text-xl font-semibold text-center mb-6 text-gray-800">
          Välkommen till Helsingbuss
        </h1>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="E-postadress"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Lösenord"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Logga in
          </button>
        </form>
      </div>
    </div>
  );
}
// This code defines a simple login page for a web application using React.
// It includes a form with fields for email and password, a submit button, and a logo at the top. 