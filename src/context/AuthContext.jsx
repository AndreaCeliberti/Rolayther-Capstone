import { createContext, useState } from "react";
import {jwtDecode} from "jwt-decode";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await api.post("/Auth/login", { email, password });
    const data = res.data;

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    const decoded = jwtDecode(data.accessToken);
    setUser({ role: data.role, email: decoded.email });
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    await api.post("/Auth/logout", { refreshToken });
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
