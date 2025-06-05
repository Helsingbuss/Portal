// frontend/src/routes/Dashboard.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        navigate("/");
      } else {
        setUserEmail(user.email || "");
      }
    };

    getUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen font-[Montserrat]">
      <Sidebar />
      <div className="ml-64 bg-[#F5F5F5] p-8 w-full">
        <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6">
          <h1 className="text-2xl font-bold mb-4 text-[#194C66]">Välkommen till Dashboard</h1>
          <p className="text-gray-700 mb-6">Inloggad som: <strong>{userEmail}</strong></p>
          <button
            onClick={handleLogout}
            className="bg-[#194C66] text-white px-4 py-2 rounded hover:bg-[#13384d]"
          >
            Logga ut
          </button>
        </div>
      </div>
    </div>
  );
}