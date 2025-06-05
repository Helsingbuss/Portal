import React from 'react'

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-[#16475A] p-8 rounded-xl shadow-md">
        <div className="flex justify-center mb-6">
          <img src="/logo.png" alt="Helsingbuss" className="w-48" />
        </div>
        <h2 className="text-white text-center text-lg mb-6">
          Välkommen till Helsingbuss
        </h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="E-post"
            className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Lösenord"
            className="w-full px-4 py-2 rounded bg-gray-100 border border-gray-300 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Logga in Helsingbuss
          </button>
        </form>
        <p className="text-center text-sm text-white mt-4">
          <a href="#" className="underline">
            Glömt lösenord
          </a>
        </p>
      </div>
    </div>
  )
}

export default Login
