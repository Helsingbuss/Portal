// frontend/src/routes/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (role: "admin" | "partner") => {
    try {
      const response = await axios.post("/login", {
        username: email,
        password: password,
      }, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (error) {
      alert("Fel e-post eller lösenord");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F5F5] font-[Montserrat]">
      <img src="/logo.png" alt="Helsingbuss logo" className="mb-6" style={{ width: '374px', height: '67px' }} />
      <div className="bg-[#194C66] w-[460px] p-6 rounded-2xl shadow-md text-white flex flex-col items-center">
        <input
          type="email"
          placeholder="E-postadress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[380px] h-[46px] px-4 mb-3 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[380px] h-[46px] px-4 mb-4 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-white"
        />
        <div className="flex justify-between w-full px-2 gap-4">
          <button
            onClick={() => handleLogin("admin")}
            className="flex-1 h-[46px] bg-black text-white rounded-md hover:opacity-90 font-semibold"
          >
            Logga in Helsingbuss
          </button>
          <button
            onClick={() => handleLogin("partner")}
            className="flex-1 h-[46px] bg-gray-700 text-white rounded-md hover:opacity-90 font-semibold"
          >
            Logga in partner
          </button>
        </div>
        <div className="text-sm text-center mt-3 underline text-white cursor-pointer">
          Glömt lösenord
        </div>
      </div>
    </div>
  );
}