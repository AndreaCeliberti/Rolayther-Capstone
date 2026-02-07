import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppNavbar from "./components/AppNavbar";
import Home from "./pages/Home";
import SessionDetails from "./pages/SessionDetails";
import AdminDashboard from "./pages/AdminDashboard";
import { ToastProvider } from "./context/ToastContext";



export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
      <BrowserRouter>
        <AppNavbar />
        <Routes>
   
        </Routes>
      </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
