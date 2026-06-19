import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");

  // 🔍 Lógica del Buscador Inteligente
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      const query = searchQuery.toLowerCase().trim();
      let sectionId = "";

      if (query.includes("pro") || query.includes("destacado") || query.includes("work")) {
        sectionId = "proyectos";
      } else if (query.includes("multimedia") || query.includes("contenido") || query.includes("video") || query.includes("flujo")) {
        sectionId = "multimedia";
      } else if (query.includes("inicio") || query.includes("hero") || query.includes("principal")) {
        sectionId = "inicio";
      } else if (query.includes("sobre") || query.includes("mi") || query.includes("perfil")) {
        sectionId = "sobre-mi";
      }

      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          setSearchQuery("");
          setShowSearch(false);
        }
      }
    }
  };

  // ✉️ Lógica de Envío del Formulario (Formspree -> Gmail)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    // NOTA: Reemplaza "TU_ID_DE_FORMSPREE" por el código de tu formulario en Formspree.io
    const response = await fetch("https://formspree.io/f/xkoadogp", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      setStatus("SUCCESS");
      form.reset();
      setTimeout(() => {
        setIsModalOpen(false); // Cierra el modal automáticamente a los 2 segundos del éxito
        setStatus("");
      }, 2500);
    } else {
      setStatus("ERROR");
    }
  };

  return (
    <>
      {/* NAVBAR PRINCIPAL */}
      <nav className="w-full py-5 px-10 flex justify-between items-center border-b border-gray-800 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wider text-white">
          PORTFOLIO<span className="text-[#ff5a36]">.</span>
        </div>

        {/* Menú de navegación */}
        <ul className="flex gap-8 text-sm font-medium text-gray-400">
          <li className="hover:text-white cursor-pointer transition-colors" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Inicio</li>
          <li className="hover:text-white cursor-pointer transition-colors" onClick={() => document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth" })}>Proyectos</li>
          <li className="hover:text-white cursor-pointer transition-colors" onClick={() => document.getElementById("sobre-mi")?.scrollIntoView({ behavior: "smooth" })}>Sobre mí</li>
          {/* Al darle clic a Contacto, ahora abre el modal en vez de saltar en la página */}
          <li className="hover:text-white cursor-pointer transition-colors text-white font-semibold" onClick={() => setIsModalOpen(true)}>Contacto</li>
        </ul>

        {/* Zona derecha: Buscador + Botón Admin */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 relative">
            {showSearch && (
              <input
                type="text"
                placeholder="Buscar sección..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                className="bg-[#161b22] text-xs text-white border border-gray-700 focus:border-[#ff5a36] px-3 py-1.5 rounded outline-none transition-all duration-300 w-44 placeholder-gray-500"
                autoFocus
              />
            )}
            <div 
              onClick={() => setShowSearch(!showSearch)}
              className="text-gray-400 hover:text-white cursor-pointer transition-colors text-sm p-1"
            >
              🔍
            </div>
          </div>
          
          <Link 
            to="/admin" 
            className="text-xs font-semibold tracking-wide text-gray-400 hover:text-white border border-gray-700 hover:border-[#ff5a36] px-3 py-1.5 rounded transition-all duration-300"
          >
            ADMINISTRACIÓN
          </Link>
        </div>
      </nav>

      {/* MODAL DE CONTACTO MINIMALISTA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          {/* Contenedor del Modal */}
          <div className="relative w-full max-w-md bg-[#0d1117] border border-gray-800 rounded-xl p-8 shadow-2xl transition-all duration-300 transform scale-100">
            
            {/* Botón Cerrar (X) */}
            <button 
              onClick={() => { setIsModalOpen(false); setStatus(""); }}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              ✕
            </button>

            {/* Encabezado */}
            <div className="mb-6">
              <h3 className="text-xl font-bold tracking-wider text-white uppercase">
                CONÉCTATE<span className="text-[#ff5a36]">.</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">¿Tienes una propuesta o proyecto? Envíame un mensaje directo a mi Gmail.</p>
            </div>

            {/* Contenido / Formulario */}
            {status === "SUCCESS" ? (
              <div className="text-center py-8 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/30">
                  <span className="text-green-400 text-xl">✓</span>
                </div>
                <h4 className="text-sm font-semibold text-white">¡Mensaje enviado con éxito!</h4>
                <p className="text-[11px] text-gray-400">Revisaré mi correo y te responderé lo antes posible.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Nombre</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="Tu nombre completo"
                    className="bg-[#161b22] text-xs text-white border border-gray-800 focus:border-[#ff5a36] px-3 py-2.5 rounded outline-none transition-colors duration-300 placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Email</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="tu@correo.com"
                    className="bg-[#161b22] text-xs text-white border border-gray-800 focus:border-[#ff5a36] px-3 py-2.5 rounded outline-none transition-colors duration-300 placeholder-gray-600"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Mensaje</label>
                  <textarea 
                    name="message" 
                    rows="4" 
                    required 
                    placeholder="Cuéntame de qué se trata..."
                    className="bg-[#161b22] text-xs text-white border border-gray-800 focus:border-[#ff5a36] px-3 py-2.5 rounded outline-none transition-colors duration-300 placeholder-gray-600 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="mt-2 w-full bg-[#ff5a36] hover:bg-[#e04e2e] text-white text-[10px] font-bold tracking-widest uppercase py-3 rounded transition-colors duration-300 shadow-md"
                >
                  Enviar Propuesta
                </button>

                {status === "ERROR" && (
                  <p className="text-[11px] text-red-500 text-center mt-1">⚠️ Error al enviar. Por favor intenta de nuevo.</p>
                )}
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}