
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./api/axios"

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

import AppNavbar from "./components/AppNavbar";

import LoginModal from "./components/auth/LoginModal";
import RegisterPlayerModal from "./components/auth/RegisterPlayerModal";
import RegisterMasterModal from "./components/auth/RegisterMasterModal";

import Home from "./pages/Home";
import SessionDetails from "./pages/SessionDetails";
import Sessions from "./pages/Sessions";
import Masters from "./pages/Masters";
import Games from "./pages/Games";
import Genres from "./pages/Genres";
import Platforms from "./pages/Platforms";
import PlayerProfile from "./pages/PlayerProfile";
import MasterProfile from "./pages/MasterProfile";
import AdminDashboard from "./pages/AdminDashboard";
import CreateSessionModal from "./components/admin/CreateSessionModal";
import AdminRoute from "./components/admin/AdminRoute";
import MasterDetails from "./pages/MasterDetails";
import AppFooter from "./components/AppFooter";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegPlayer, setShowRegPlayer] = useState(false);
  const [showRegMaster, setShowRegMaster] = useState(false);

  const openLogin = () => setShowLogin(true);
  const closeLogin = () => setShowLogin(false);

  const openRegPlayer = () => setShowRegPlayer(true);
  const closeRegPlayer = () => setShowRegPlayer(false);

  const openRegMaster = () => setShowRegMaster(true);
  const closeRegMaster = () => setShowRegMaster(false);
  const [showCreateSession, setShowCreateSession] = useState(false);

  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="d-flex flex-column min-vh-100">
    <AppNavbar
      openLogin={() => setShowLogin(true)}
      openRegisterPlayer={() => setShowRegPlayer(true)}
      openRegisterMaster={() => setShowRegMaster(true)}
      openCreateSession={() => setShowCreateSession(true)}
    />

    {/* MODALI GLOBALI */}
    <LoginModal
      show={showLogin}
      handleClose={closeLogin}
      openRegisterPlayer={() => {
        closeLogin();
        openRegPlayer();
      }}
      openRegisterMaster={() => {
        closeLogin();
        openRegMaster();
      }}
    />

    <RegisterPlayerModal
      show={showRegPlayer}
      handleClose={closeRegPlayer}
      openLogin={() => {
        closeRegPlayer();
        openLogin();
      }}
    />

    <RegisterMasterModal
      show={showRegMaster}
      handleClose={closeRegMaster}
      openLogin={() => {
        closeRegMaster();
        openLogin();
      }}
    />

    <CreateSessionModal
      show={showCreateSession}
      handleClose={() => setShowCreateSession(false)}
    />

    {/* CONTENUTO PAGINE */}
    <main className="flex-grow-1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sessions/:id" element={<SessionDetails />} />
        <Route path="/sessions" element={<Sessions />} />
        <Route path="/masters" element={<Masters />} />
        <Route path="/games" element={<Games />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/platforms" element={<Platforms />} />
        <Route path="/playerProfile" element={<PlayerProfile />} />
        <Route path="/masterProfile" element={<MasterProfile />} />
        <Route path="/masters/:id" element={<MasterDetails />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </main>

    <AppFooter />
          </div>
        </BrowserRouter>

      </ToastProvider>
    </AuthProvider>
  );
}
