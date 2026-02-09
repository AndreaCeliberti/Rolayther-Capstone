import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api/axios";
import { PlayersApi } from "../api/players.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ripristino al refresh pagina
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    const playerId = localStorage.getItem("playerId");

    if (token && role) {
      try {
        const decoded = jwtDecode(token);
        setUser({ role, email: decoded.email, playerId: playerId || null });
      } catch {
        localStorage.clear();
      }
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/Auth/login", { email, password });
    const data = res.data;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("role", data.role);

    const decoded = jwtDecode(data.accessToken);

    // se è Player recupera playerId via /Player/Me
    let playerId = null;
    if (data.role === "Player") {
      const me = await PlayersApi.me();
      playerId = me.data.playerId;
      localStorage.setItem("playerId", playerId);
    } else {
      localStorage.removeItem("playerId");
    }

    setUser({ role: data.role, email: decoded.email, playerId });
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      await api.post("/Auth/logout", { refreshToken });
    } catch {
      // anche se il backend risponde 401 o errore, puliamo lato client comunque
    }
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
