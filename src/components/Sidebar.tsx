import { useState } from "react"
import { ChevronDown, ChevronUp, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const sections = [
  {
    title: "Offert & Bokning",
    icon: "📋",
    items: [
      { label: "Skapa ny förfrågan", path: "/skapa-forfragan" },
      { label: "Hantera offertförfrågningar", path: "/hantera-offert" },
      { label: "Hantera bokningsförfrågningar", path: "/hantera-bokning" },
      { label: "Alla bokningar", path: "/alla-bokningar" },
      { label: "Kommande körningar", path: "/kommande-korningar" },
      { label: "Körorder (PDF)", path: "/kororder" },
    ],
  },
  {
    title: "Resor & Biljetter",
    icon: "🎫",
    items: [
      { label: "Lista över resor", path: "/resor" },
      { label: "Lägg till ny resa", path: "/lagg-till-resa" },
      { label: "Sätt biljettpris", path: "/biljettpris" },
      { label: "Boka biljett", path: "/boka-biljett" },
      { label: "Passagerarlista", path: "/passagerarlista" },
    ],
  },
  {
    title: "Kunder & Personal",
    icon: "👤",
    items: [
      { label: "Kundregister", path: "/kundregister" },
      { label: "Lägg till kund", path: "/lagg-till-kund" },
      { label: "Chaufförslista", path: "/chaufforslista" },
      { label: "Lägg till chaufför", path: "/lagg-till-chauffor" },
      { label: "Körschema", path: "/korschema" },
    ],
  },
  {
    title: "Fordon",
    icon: "🚌",
    items: [
      { label: "Fordonsöversikt", path: "/fordon" },
      { label: "Lägg till fordon", path: "/lagg-till-fordon" },
      { label: "Service & besiktning", path: "/service-besiktning" },
      { label: "Dokument & tillstånd", path: "/dokument" },
    ],
  },
  {
    title: "Ekonomi",
    icon: "💰",
    items: [
      { label: "Fakturor", path: "/fakturor" },
      { label: "Intäkter & utgifter", path: "/intakter" },
      { label: "Priser & rabatter", path: "/priser-rabatter" },
      { label: "Export / bokföring", path: "/export" },
    ],
  },
  {
    title: "System & Inställningar",
    icon: "⚙️",
    items: [
      { label: "Resevillkor", path: "/resevillkor" },
      { label: "E-postmallar", path: "/epostmallar" },
      { label: "Tider & zoner", path: "/zoner" },
      { label: "Logo / färger / tema", path: "/design" },
    ],
  },
  {
    title: "Överblick & Status",
    icon: "📊",
    items: [
      { label: "Dagens körningar", path: "/dagens-korningar" },
      { label: "Fordonsstatus", path: "/fordonsstatus" },
      { label: "Chaufförsstatus", path: "/chaufforsstatus" },
      { label: "Senaste aktiviteter", path: "/senaste" },
    ],
  },
  {
    title: "Hjälp & Support",
    icon: "❓",
    items: [
      { label: "Manualer / FAQ", path: "/faq" },
      { label: "Kontakta oss", path: "/kontakt" },
      { label: "Rapportera fel", path: "/rapportera" },
    ],
  },
]

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate("/")
  }

  const SidebarContent = (
    <div className="flex flex-col justify-between h-full">
      <div>
        <div className="p-4 border-b border-white/10">
          <img src="/vit_logo.png" alt="Helsingbuss logo" className="w-[180px]" />
        </div>
        <div className="px-4 py-4 space-y-4 font-[600] text-[15px] font-[Montserrat]">
          {sections.map((section) => (
            <div key={section.title}>
              <button
                onClick={() =>
                  setOpen((prev) => (prev === section.title ? null : section.title))
                }
                className="flex justify-between items-center w-full py-2"
              >
                <span>{section.icon} {section.title}</span>
                {open === section.title ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {open === section.title && (
                <ul className="pl-4 text-sm space-y-1">
                  {section.items.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={cn(
                          "block py-1 text-gray-300 hover:text-white",
                          location.pathname === item.path && "text-white font-bold"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-full font-semibold hover:bg-red-700"
        >
          Logga ut
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile menu toggle */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white bg-[#1c1f23] p-2 rounded"
        >
          <Menu />
        </button>
      </div>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-72 bg-[#1c1f23] text-white shadow-lg overflow-y-auto">
        {SidebarContent}
      </aside>

      {/* Sidebar drawer for mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileOpen(false)}>
          <aside
            className="absolute left-0 top-0 h-full w-72 bg-[#1c1f23] text-white shadow-lg overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {SidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}
