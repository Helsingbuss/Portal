export default function App() {
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <img src="/logo.png" alt="Helsingbuss logo" style={{ height: '64px' }} />
      <h1>Välkommen till Helsingbuss</h1>
      <form style={{ display: 'inline-block', marginTop: '20px' }}>
        <input placeholder="E-post" type="email" /><br />
        <input placeholder="Lösenord" type="password" /><br />
        <button type="submit">Logga in</button>
      </form>
    </div>
  )
}