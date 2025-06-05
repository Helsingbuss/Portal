// src/App.tsx
import './assets/css/style.css'

export default function App() {
  return (
    <div className="login-container">
      <img src="/logo.png" alt="Helsingbuss logo" className="logo" />
      <h1>Välkommen till Helsingbuss</h1>
      <form className="login-form">
        <input
          type="email"
          placeholder="offert@helsingbuss.se"
          className="input-field"
        />
        <input
          type="password"
          placeholder="Lösenord"
          className="input-field"
        />
        <button type="submit" className="login-button">
          Logga in
        </button>
      </form>
    </div>
  )
}
