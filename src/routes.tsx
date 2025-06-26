import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import ResetEmailSent from './pages/ResetEmailSent';
import ResetPassword from './pages/ResetPassword';
import SkapaOffert from './pages/SkapaOffert';
import SkapaBokning from './pages/SkapaBokning';
import Offertforfragningar from './pages/Offertforfragningar';
import Bokningar from './pages/Bokningar';
import Prisberakning from './pages/Prisberakning';
import KommandeKorningar from './pages/KommandeKorningar';
import SkapaKororder from './pages/SkapaKororder';
import BokaBiljett from './pages/BokaBiljett';
import Biljettlista from './pages/Biljettlista';
import ListaResor from './pages/ListaResor';
import LaggUppResa from './pages/LaggUppResa';
import Passagerarlista from './pages/Passagerarlista';
import SkapaFaktura from './pages/SkapaFaktura';
import IntakterUtgifter from './pages/IntakterUtgifter';
import Kundregister from './pages/Kundregister';
import SkapaKund from './pages/SkapaKund';
import Meddelandehistorik from './pages/Meddelandehistorik';
import VaraTjanster from './pages/VaraTjanster';
import Fordonsoversikt from './pages/Fordonsoversikt';
import LaggTillFordon from './pages/LaggTillFordon';
import ServiceBesiktning from './pages/ServiceBesiktning';
import DokumentTillstand from './pages/DokumentTillstand';
import PlatskartorSaten from './pages/PlatskartorSaten';
import Chaufforsregister from './pages/Chaufforsregister';
import LaggTillChauffor from './pages/LaggTillChauffor';
import Bokningsagentregister from './pages/Bokningsagentregister';
import LaggTillBokningsagent from './pages/LaggTillBokningsagent';
import Korschema from './pages/Korschema';
import BehorigheterRoller from './pages/BehorigheterRoller';
import Kontaktuppgifter from './pages/Kontaktuppgifter';
import TidsloggArbetstid from './pages/TidsloggArbetstid';
import Ledighetskalender from './pages/Ledighetskalender';
import AvtalDokument from './pages/AvtalDokument';
import DagensKorningar from './pages/DagensKorningar';
import Sidebar from './components/Sidebar';
import Chaufforsstatus from './pages/Chaufforsstatus';
import Fordonsstatus from './pages/Fordonsstatus';
import SenasteAktiviteter from './pages/SenasteAktiviteter';
import Fakturor from './pages/Fakturor';
import OffertDetaljer from './pages/OffertDetaljer';
import OffertFormPublic from './pages/OffertFormPublic';
import OffertForm from './components/OffertForm';


const AppRoutes = () => {
  const location = useLocation();
  const noSidebarRoutes = ['/', '/forgot-password', '/reset-email-sent', '/reset-password'];
  const hideSidebar = noSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}
      <div className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-email-sent" element={<ResetEmailSent />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/skapa-offert" element={<SkapaOffert />} />
          <Route path="/skapa-bokning" element={<SkapaBokning />} />
          <Route path="/offertforfragningar" element={<Offertforfragningar />} />
          <Route path="/bokningar" element={<Bokningar />} />
          <Route path="/prisberakning" element={<Prisberakning />} />
          <Route path="/kommande-korningar" element={<KommandeKorningar />} />
          <Route path="/skapa-kororder" element={<SkapaKororder />} />
          <Route path="/boka-biljett" element={<BokaBiljett />} />
          <Route path="/biljettlista" element={<Biljettlista />} />
          <Route path="/lista-resor" element={<ListaResor />} />
          <Route path="/lagg-upp-resa" element={<LaggUppResa />} />
          <Route path="/passagerarlista" element={<Passagerarlista />} />
          <Route path="/fakturor" element={<Fakturor />} />
          <Route path="/skapa-faktura" element={<SkapaFaktura />} />
          <Route path="/intakter-utgifter" element={<IntakterUtgifter />} />
          <Route path="/kundregister" element={<Kundregister />} />
          <Route path="/skapa-kund" element={<SkapaKund />} />
          <Route path="/meddelandehistorik" element={<Meddelandehistorik />} />
          <Route path="/vara-tjanster" element={<VaraTjanster />} />
          <Route path="/fordonsoversikt" element={<Fordonsoversikt />} />
          <Route path="/lagg-till-fordon" element={<LaggTillFordon />} />
          <Route path="/service-besiktning" element={<ServiceBesiktning />} />
          <Route path="/dokument-tillstand" element={<DokumentTillstand />} />
          <Route path="/platskartor-saten" element={<PlatskartorSaten />} />
          <Route path="/chaufforsregister" element={<Chaufforsregister />} />
          <Route path="/lagg-till-chauffor" element={<LaggTillChauffor />} />
          <Route path="/bokningsagentregister" element={<Bokningsagentregister />} />
          <Route path="/lagg-till-bokningsagent" element={<LaggTillBokningsagent />} />
          <Route path="/korschema" element={<Korschema />} />
          <Route path="/behorigheter-roller" element={<BehorigheterRoller />} />
          <Route path="/kontaktuppgifter" element={<Kontaktuppgifter />} />
          <Route path="/tidslogg-arbetstid" element={<TidsloggArbetstid />} />
          <Route path="/ledighetskalender" element={<Ledighetskalender />} />
          <Route path="/avtal-dokument" element={<AvtalDokument />} />
          <Route path="/dagens-korningar" element={<DagensKorningar />} />
          <Route path="/chaufforsstatus" element={<Chaufforsstatus />} />
          <Route path="/fordonsstatus" element={<Fordonsstatus />} />
          <Route path="/senaste-aktiviteter" element={<SenasteAktiviteter />} />
          <Route path="/offert/:offertId" element={<OffertDetaljer />} />
          <Route path="/offert" element={<OffertFormPublic />} />
          <Route path="/offertform" element={<OffertForm />} />
          </Routes>
      </div>
    </div>
  );
};

const RoutesWrapper = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default RoutesWrapper;
