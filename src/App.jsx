import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { supabase } from "./components/lib/supabaseClient";

// Componentes públicos existentes
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MultimediaSection from "./components/MultimediaSection"; 
import ProjectsSection from "./components/ProjectsSection";

// Componentes de administración
import Login from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";

// Aquí agrupamos la vista principal del portafolio
function PortafolioPublico() {
  return (
    <div className="bg-[#0d1117] min-h-screen selection:bg-[#ff5a36] selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <MultimediaSection />
      <ProjectsSection />
    </div>
  );
}

export default function App() {
  const [sessionUser, setSessionUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Validamos si hay una sesión activa al cargar la web
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setSessionUser(user);
      setCheckingAuth(false);
    });

    // Escuchar si el estado de autenticación cambia en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#ff5a36] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* CORREGIDO: Ahora apunta exactamente a PortafolioPublico */}
        <Route path="/" element={<PortafolioPublico />} />

        {/* Ruta de administración (lleva su propio layout oscuro adentro) */}
        <Route 
          path="/admin" 
          element={
            sessionUser ? (
              <AdminDashboard user={sessionUser} onLogout={() => setSessionUser(null)} />
            ) : (
              <Login onLoginSuccess={(user) => setSessionUser(user)} />
            )
          } 
        />

        {/* Redirección automática de seguridad si no entra en ninguna ruta */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}