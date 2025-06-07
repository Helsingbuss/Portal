import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import logo from "/public/logo.png"
import { useNavigate } from "react-router-dom"

const supabase = createClient(
  "https://gfjchjixpsfgxoprdsfx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmamNoaml4cHNmZ3hvcHJkc2Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkxMjYyMjMsImV4cCI6MjA2NDcwMjIyM30.MAl-fl15C6ua-CL3-76UOCwmWs0smNapTvMLmwvT8MQ"
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
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5]">
      <div className="flex flex-col items-center space-y-4">
        <img src={logo} alt="logo" width={374} height={67} />

        <div className="w-[433px]">
          <label className="text-[#194C66] font-semibold text-[17px] block mb-1">
            Användarnamn / E-postadress
          </label>
          <input
            className="w-full h-[49px] rounded-[10px] shadow px-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-[433px]">
          <label className="text-[#194C66] font-semibold text-[17px] block mb-1">
            Lösenord
          </label>
          <input
            className="w-full h-[49px] rounded-[10px] shadow px-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div className="flex justify-between w-[433px] mt-2">
          <button
            onClick={handleLogin}
            className="bg-[#194C66] text-white px-6 py-2 rounded-full font-semibold text-[15px]"
          >
            Logga in
          </button>
          <button className="bg-[#194C66] text-white px-6 py-2 rounded-full font-semibold text-[15px]">
            Glömt lösenord
          </button>
        </div>
      </div>
    </div>
  )
}
