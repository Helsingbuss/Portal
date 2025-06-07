import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import logo from "/public/logo.png"
import { useNavigate } from "react-router-dom"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] px-4">
      <div className="flex flex-col items-center space-y-6 max-w-md w-full">
        <img src={logo} alt="logo" width={374} height={67} />

        <input
          className="w-full h-[52px] rounded-[10px] shadow px-4 text-lg"
          type="email"
          placeholder="E-postadress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full h-[52px] rounded-[10px] shadow px-4 text-lg"
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-between w-full">
          <button
            onClick={handleLogin}
            className="bg-[#194C66] text-white w-[99px] h-[52px] rounded-full font-semibold text-[15px]"
          >
            Logga in
          </button>

          <button
            onClick={() => navigate("/forgot-password")}
            className="text-[#194C66] w-[160px] h-[52px] rounded-full font-semibold text-[15px] border border-[#194C66]"
          >
            Glömt lösenord?
          </button>
        </div>
      </div>
    </div>
  )
}
