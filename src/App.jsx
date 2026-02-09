
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";

import MainNavbar from "./components/AppNavbar";

import LoginModal from "./components/auth/LoginModal";
import RegisterPlayerModal from "./components/auth/RegisterPlayerModal";
import RegisterMasterModal from "./components/auth/RegisterMasterModal";

import Home from "./pages/Home";
import SessionDetails from "./pages/SessionDetails";
import SessionsList from "./pages/SessionsList";
import MastersList from "./pages/MastersList";
import GamesList from "./pages/GamesList";
import GenresList from "./pages/GenresList";
import PlatformsList from "./pages/PlatformsList";
import PlayerProfile from "./pages/PlayerProfile";
import MasterProfile from "./pages/MasterProfile";
import AdminDashboard from "./pages/AdminDashboard";


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
          <AppNavbar
            openLogin={() => setShowLogin(true)}
            openRegisterPlayer={() => setShowRegPlayer(true)}
            openRegisterMaster={() => setShowRegMaster(true)}
            openCreateSession={() => setShowCreateSession(true)}
          />

          {/* MODALI GLOBALI (sopra le pagine) */}
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

          {/* ROUTES */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sessions/:id" element={<SessionDetails />} />
            <Route path="/sessions" element={<SessionsList />} />
            <Route path="/masters" element={<MastersList />} />
            <Route path="/games" element={<GamesList />} />
            <Route path="/genres" element={<GenresList />} />
            <Route path="/platforms" element={<PlatformsList />} />
            <Route path="/profile/player" element={<PlayerProfile />} />
            <Route path="/profile/master" element={<MasterProfile />} />
            <Route
                path="/admin"element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
