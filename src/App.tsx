export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
      <img src="/public/logo.png" alt="logo" className="h-20 mb-4" />
      <h1 className="text-2xl font-bold mb-2">Välkommen till Helsingbuss</h1>
      <input type="email" placeholder="E-post" className="border p-2 rounded mb-2" />
      <input type="password" placeholder="Lösenord" className="border p-2 rounded mb-2" />
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Logga in</button>
    </div>
  )
}
