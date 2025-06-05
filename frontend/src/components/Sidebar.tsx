// frontend/src/components/Sidebar.tsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  FileText,
  Bus,
  Users,
  ClipboardList,
  DollarSign,
  Settings,
  Activity,
  ChevronDown,
  LogOut
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

interface MenuItem {
  title: string;
  icon: JSX.Element;
  children?: { title: string; path: string }[];
}

const menu: MenuItem[] = [
  {
    title: "Dashboard",
    icon: <Home size={16} />, 
    children: [{ title: "Startsida", path: "/dashboard" }],
  },
  {
    title: "Offert & Bokning",
    icon: <FileText size={16} />, 
    children: [
      { title: "Skapa ny offert", path: "/offert/skapa" },
      { title: "Hantera offertförfrågningar", path: "/offert/inkomna" },
      { title: "Hantera bokningsförfrågningar", path: "/bokningar/forfragningar" },
      { title: "Alla bokningar", path: "/bokningar/alla" },
      { title: "Kommande körningar", path: "/bokningar/kommande" },
      { title: "Körorder (PDF)", path: "/bokningar/pdf" },
    ],
  },
  {
    title: "Resor & Biljetter",
    icon: <Bus size={16} />, 
    children: [
      { title: "Lista över resor", path: "/resor/lista" },
      { title: "Lägg till ny resa", path: "/resor/ny" },
      { title: "Sätt biljettpris", path: "/resor/pris" },
      { title: "Boka biljett", path: "/resor/boka" },
      { title: "Passagerarlista", path: "/resor/passagerare" },
    ],
  },
  {
    title: "Kunder & Personal",
    icon: <Users size={16} />, 
    children: [
      { title: "Kundregister", path: "/kunder" },
      { title: "Lägg till kund", path: "/kunder/ny" },
      { title: "Chaufförslista", path: "/chaufforer" },
      { title: "Lägg till chaufför", path: "/chaufforer/ny" },
      { title: "Körschema", path: "/chaufforer/schema" },
    ],
  },
  {
    title: "Fordon",
    icon: <ClipboardList size={16} />, 
    children: [
      { title: "Fordonsöversikt", path: "/fordon" },
      { title: "Lägg till fordon", path: "/fordon/ny" },
      { title: "Service & besiktning", path: "/fordon/service" },
      { title: "Dokument & tillstånd", path: "/fordon/dokument" },
    ],
  },
  {
    title: "Ekonomi",
    icon: <DollarSign size={16} />, 
    children: [
      { title: "Fakturor", path: "/ekonomi/fakturor" },
      { title: "Intäkter & utgifter", path: "/ekonomi/intakter" },
      { title: "Priser & rabatter", path: "/ekonomi/priser" },
      { title: "Export / bokföring", path: "/ekonomi/export" },
    ],
  },
  {
    title: "System & Inställningar",
    icon: <Settings size={16} />, 
    children: [
      { title: "Resevillkor", path: "/system/resevillkor" },
      { title: "E-postmallar", path: "/system/epost" },
      { title: "Tider & zoner", path: "/system/tider" },
      { title: "Logo / färger / tema", path: "/system/tema" },
    ],
  },
  {
    title: "Överblick & Status",
    icon: <Activity size={16} />, 
    children: [
      { title: "Dagens körningar", path: "/status/dagens" },
      { title: "Fordonsstatus", path: "/status/fordon" },
      { title: "Chaufförsstatus", path: "/status/chaufforer" },
      { title: "Senaste aktiviteter", path: "/status/aktiviteter" },
    ],
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const [statusColor, setStatusColor] = useState<string>("bg-gray-400");

  useEffect(() => {
    const getUserProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("name, role")
          .eq("id", user.id)
          .single();

        setUserName(profile?.name || user.email || "");
        setUserRole(profile?.role || "");
        setStatusColor("bg-green-500"); // mark user as online
      } else {
        setStatusColor("bg-red-500");
      }
    };
    getUserProfile();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("token");
    setStatusColor("bg-red-500");
    navigate("/");
  };

  return (
    <aside className="w-72 h-screen fixed top-0 left-0 flex flex-col justify-between overflow-y-auto bg-[#1f2a30] text-white">
      <div>
        <div className="p-4 border-b border-gray-700">
          <img src="/vit_logo.png" alt="Logo" className="w-48 mb-4" />
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/profile.jpg"
                alt="Profile"
                className="w-10 h-10 rounded-full border border-white"
              />
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1f2a30] ${statusColor}`}
              ></span>
            </div>
            <div>
              <p className="font-semibold leading-tight">{userName}</p>
              <p className="text-xs text-gray-300">{userRole}</p>
            </div>
          </div>
        </div>
        <nav className="p-2 space-y-1 text-sm">
          {menu.map((item) => (
            <div key={item.title}>
              <button
                onClick={() => setOpen(open === item.title ? null : item.title)}
                className={`w-full flex items-center justify-between px-4 py-2 rounded font-semibold hover:bg-[#2d3b42] transition ${
                  pathname.includes(item.children?.[0]?.path) ? "bg-[#194C66]" : ""
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.icon}
                  {item.title}
                </span>
                {item.children && (
                  <ChevronDown
                    size={16}
                    className={`${
                      open === item.title ? "rotate-180" : ""
                    } transition`}
                  />
                )}
              </button>
              {open === item.title && (
                <div className="ml-4 mt-1 space-y-1 text-xs">
                  {item.children?.map((child) => (
                    <Link
                      key={child.path}
                      to={child.path}
                      className={`block px-3 py-1 rounded hover:bg-[#13313f] ${
                        pathname === child.path ? "bg-[#194C66] font-semibold" : ""
                      }`}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded flex items-center justify-center gap-2"
        >
          <LogOut size={16} /> Logga ut
        </button>
      </div>
    </aside>
  );
}
