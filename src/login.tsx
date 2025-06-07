import { useNavigate } from "react-router-dom"
import { useState } from "react"
import logo from "/public/logo.png"

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    // Simulerad login-funktion för demo
    if (email && password) {
      navigate("/dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] p-4">
      <div className="flex flex-col items-center space-y-4 w-full max-w-md">
        <img src={logo} alt="logo" className="w-[250px] sm:w-[374px] h-auto" />

        <label className="text-[#194C66] font-semibold text-[17px] w-full text-left">
          E-postadress
        </label>
        <input
          className="w-full h-[49px] rounded-[10px] shadow px-3"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="text-[#194C66] font-semibold text-[17px] w-full text-left">
          Lösenord
        </label>
        <input
          className="w-full h-[49px] rounded-[10px] shadow px-3"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="flex justify-between w-full">
          <button
            onClick={handleLogin}
            className="bg-[#194C66] text-white w-[99px] h-[52px] rounded-full font-semibold text-[15px]"
          >
            Logga in
          </button>

          <button
            onClick={() => navigate("/reset-password")}
            className=" text-white font-semibold w-[160px] h-[52px] rounded-full border bg-[#194C66]"
          >
            Glömt lösenord?
          </button>
        </div>
      </div>
    </div>
  )
}
