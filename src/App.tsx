import './assets/css/style.css';

export default function App() {
  return (
    <div className="login-container">
      <img src="/logo.png" alt="logo" />
      <h2>Välkommen till Helsingbuss</h2>
      <input type="email" placeholder="info@helsingbuss.se" />
      <input type="password" placeholder="Lösenord" />
      <button>Logga in</button>
    </div>
  );
}
