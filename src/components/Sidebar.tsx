import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown, ChevronUp, LayoutDashboard, FilePlus2, BusFront, FileText, Car, Users, ActivitySquare
} from 'lucide-react';
import logo from '../assets/logo_2.png';
import profile from '../assets/profile.png';

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

  const [openMenu, setOpenMenu] = useState<string | null>('offert');

  const toggleMenu = (key: string) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  const linkClass = (path: string) =>
    `text-sm py-1.5 px-4 rounded-lg text-left transition font-normal ${
      pathname === path ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-blue-50 text-blue-900'
    }`;

  const menuSection = (title: string, key: string, icon: JSX.Element, children: JSX.Element[]) => (
    <div>
      <button
        onClick={() => toggleMenu(key)}
        className="w-full flex items-center justify-between px-4 py-2 rounded-lg hover:bg-blue-50 text-left font-medium whitespace-nowrap"
      >
        <span className="flex items-center gap-2 whitespace-nowrap">{icon} {title}</span>
        {openMenu === key ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {openMenu === key && <div className="ml-6 flex flex-col gap-1">{children}</div>}
    </div>
  );

  return (
    <div className="h-screen w-80 bg-white text-blue-900 flex flex-col p-6 shadow-xl rounded-tr-3xl rounded-br-3xl overflow-y-auto">
      <img src={logo} alt="Helsingbuss" className="h-10 mb-6" />

      <div className="flex items-center gap-3 mb-6 px-2">
        <div className="relative">
          <img src={profile} alt="Profile" className="h-10 w-10 rounded-full object-cover border border-gray-300" />
          <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
        </div>
        <div className="text-sm leading-tight">
          <div className="font-semibold">Helsingbuss</div>
          <div className="text-gray-500 text-xs">Super Admin</div>
        </div>
      </div>

      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className="flex items-center gap-2 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 text-blue-900">
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        {menuSection('Offert & Bokning', 'offert', <FilePlus2 size={18} />, [
          <Link to="/skapa-offert" className={linkClass('/skapa-offert')}>Skapa offert</Link>,
          <Link to="/skapa-bokning" className={linkClass('/skapa-bokning')}>Skapa bokning</Link>,
          <Link to="/offertforfragningar" className={linkClass('/offertforfragningar')}>Offertförfrågningar</Link>,
          <Link to="/bokningar" className={linkClass('/bokningar')}>Bokningar</Link>,
          <Link to="/prisberakning" className={linkClass('/prisberakning')}>Prisberäkning</Link>,
          <Link to="/kommande-korningar" className={linkClass('/kommande-korningar')}>Kommande körningar</Link>,
          <Link to="/skapa-kororder" className={linkClass('/skapa-kororder')}>Skapa körorder</Link>,
        ])}

        {menuSection('Resor & Biljetter', 'resor', <BusFront size={18} />, [
          <Link to="/boka-biljett" className={linkClass('/boka-biljett')}>Boka biljett</Link>,
          <Link to="/biljettlista" className={linkClass('/biljettlista')}>Biljettlista</Link>,
          <Link to="/lista-resor" className={linkClass('/lista-resor')}>Lista över resor</Link>,
          <Link to="/lagg-upp-resa" className={linkClass('/lagg-upp-resa')}>Lägg upp resa</Link>,
          <Link to="/passagerarlista" className={linkClass('/passagerarlista')}>Passagerarlista</Link>,
        ])}

        {menuSection('Försäljning', 'sales', <FileText size={18} />, [
          <Link to="/fakturor" className={linkClass('/fakturor')}>Fakturor</Link>,
          <Link to="/skapa-faktura" className={linkClass('/skapa-faktura')}>Skapa faktura</Link>,
          <Link to="/intakter-utgifter" className={linkClass('/intakter-utgifter')}>Intäkter & utgifter</Link>,
          <Link to="/kundregister" className={linkClass('/kundregister')}>Kundregister</Link>,
          <Link to="/skapa-kund" className={linkClass('/skapa-kund')}>Skapa kund</Link>,
          <Link to="/meddelandehistorik" className={linkClass('/meddelandehistorik')}>Meddelandehistorik</Link>,
          <Link to="/vara-tjanster" className={linkClass('/vara-tjanster')}>Våra tjänster (Artiklar)</Link>,
        ])}

        {menuSection('Fordonspark', 'fleet', <Car size={18} />, [
          <Link to="/fordonsoversikt" className={linkClass('/fordonsoversikt')}>Fordonsöversikt</Link>,
          <Link to="/lagg-till-fordon" className={linkClass('/lagg-till-fordon')}>Lägg till fordon</Link>,
          <Link to="/service-besiktning" className={linkClass('/service-besiktning')}>Service & besiktning</Link>,
          <Link to="/dokument-tillstand" className={linkClass('/dokument-tillstand')}>Dokument & tillstånd</Link>,
          <Link to="/platskartor-saten" className={linkClass('/platskartor-saten')}>Platskartor (säten)</Link>,
        ])}

        {menuSection('Personal & Chaufförer', 'staff', <Users size={18} />, [
          <Link to="/chaufforsregister" className={linkClass('/chaufforsregister')}>Chaufförsregister</Link>,
          <Link to="/lagg-till-chauffor" className={linkClass('/lagg-till-chauffor')}>Lägg till chaufför</Link>,
          <Link to="/bokningsagentregister" className={linkClass('/bokningsagentregister')}>Bokningsagentregister</Link>,
          <Link to="/lagg-till-bokningsagent" className={linkClass('/lagg-till-bokningsagent')}>Lägg till bokningsagent</Link>,
          <Link to="/korschema" className={linkClass('/korschema')}>Körschema</Link>,
          <Link to="/behorigheter-roller" className={linkClass('/behorigheter-roller')}>Behörigheter & roller</Link>,
          <Link to="/kontaktuppgifter" className={linkClass('/kontaktuppgifter')}>Kontaktuppgifter</Link>,
          <Link to="/tidslogg-arbetstid" className={linkClass('/tidslogg-arbetstid')}>Tidslogg / Arbetstid</Link>,
          <Link to="/ledighetskalender" className={linkClass('/ledighetskalender')}>Ledighetskalender</Link>,
          <Link to="/avtal-dokument" className={linkClass('/avtal-dokument')}>Avtal & Dokument</Link>,
        ])}

        {menuSection('Status & Överblick', 'status', <ActivitySquare size={18} />, [
          <Link to="/dagens-korningar" className={linkClass('/dagens-korningar')}>Dagens körningar</Link>,
          <Link to="/chaufforsstatus" className={linkClass('/chaufforsstatus')}>Chaufförsstatus</Link>,
          <Link to="/fordonsstatus" className={linkClass('/fordonsstatus')}>Fordonsstatus</Link>,
          <Link to="/senaste-aktiviteter" className={linkClass('/senaste-aktiviteter')}>Senaste aktiviteter</Link>,
        ])}
      </nav>
    </div>
  );
};

export default Sidebar;
