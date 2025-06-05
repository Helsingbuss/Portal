// src/App.tsx
import React from 'react'

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-cyan-900 p-8 rounded-xl w-96 text-white">
        <img src="/logo.png" alt="Logo" className="mx-auto mb-6 w-48" />
        <input
          className="w-full mb-4 px-4 py-2 rounded text-black"
          type="email"
          placeholder="offert@helsingbuss.se"
        />
        <input
          className="w-full mb-4 px-4 py-2 rounded text-black"
          type="password"
          placeholder="Lösenord"
        />
        <button className="w-full bg-black py-2 rounded font-bold">Logga in Helsingbuss</button>
        <p className="text-center mt-4 text-sm underline">Glömt lösenord</p>
      </div>
    </div>
  )
}

export default App
