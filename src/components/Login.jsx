import { useState } from "react";
import { supabase } from "./lib/supabaseClient";

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Guía Técnica: Usamos la función signInWithPassword de Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Credenciales incorrectas. Acceso denegado.");
    } else {
      // Si todo sale bien, le avisamos a la app global que ya estamos dentro
      onLoginSuccess(data.user);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#161b22] border border-gray-800 p-8 rounded-sm shadow-xl">
        <span className="text-xs font-bold tracking-widest text-[#ff5a36] uppercase block mb-2 text-center">
          CORE DE SEGURIDAD
        </span>
        <h2 className="text-2xl font-black text-white text-center uppercase tracking-tight mb-6">
          Iniciar Sesión Admin
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-xs font-bold p-3 rounded-sm mb-4 text-center uppercase tracking-wider">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0d1117] border border-gray-800 p-3 text-white text-sm rounded-sm focus:outline-none focus:border-[#ff5a36] transition-colors"
              placeholder="admin@correo.com"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0d1117] border border-gray-800 p-3 text-white text-sm rounded-sm focus:outline-none focus:border-[#ff5a36] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 text-xs font-bold tracking-widest text-center text-white uppercase bg-[#ff5a36] py-3 rounded-sm hover:bg-[#e04e2e] transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "AUTENTICANDO..." : "INGRESAR AL PANEL →"}
          </button>
        </form>
      </div>
    </div>
  );
}