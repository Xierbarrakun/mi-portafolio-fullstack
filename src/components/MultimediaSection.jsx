export default function MultimediaSection() {
  return (
    <section id="sobre-mi" className="bg-[#0b0e14] px-10 py-24 w-full">
      
      {/* Contenedor Principal (Grid: 1 columna en móvil, 3 columnas en PC para dividir 2/3 y 1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch w-full">
        
        {/* BLOQUE GRANDE IZQUIERDA (Ocupa 2 columnas en pantallas grandes) */}
        <div 
          className="relative lg:col-span-2 h-[500px] rounded-sm overflow-hidden flex flex-col justify-between p-8 bg-cover bg-center group border border-gray-800/30"
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(13, 17, 23, 0.85), rgba(13, 17, 23, 0.2)), url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop')` 
          }}
        >
          {/* Textos de impacto estilo Tokyo */}
          <div className="max-w-md">
            <span className="text-xs font-bold tracking-widest text-[#ff5a36] uppercase">
              // Showreel & Workflow
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mt-2 leading-none">
              Code and<br />
              Inspire Your<br />
              Digital World
            </h2>
          </div>

          {/* Botón de Play Interactivo */}
          <div className="flex items-center gap-4 cursor-pointer group/btn self-start">
            <div className="w-14 h-14 rounded-full border border-white flex items-center justify-center bg-transparent group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-300">
              <span className="text-lg ml-1">▶</span>
            </div>
            <span className="text-xs font-bold tracking-widest text-white uppercase group-hover/btn:text-[#ff5a36] transition-colors">
              Ver Video Demo
            </span>
          </div>
        </div>

        {/* BLOQUE DERECHA (Las 2 miniaturas apiladas verticalmente) */}
        <div className="flex flex-col justify-between gap-6 lg:gap-0">
          
          {/* Miniatura 1 */}
          <div className="relative h-[238px] rounded-sm overflow-hidden group border border-gray-800/30">
            <img 
              src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop" 
              alt="Tech Stack" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h4 className="text-sm font-bold tracking-wider text-white uppercase">Ecosistema Tecnológico</h4>
              <p className="text-xs text-gray-400 mt-1">Librerías, frameworks y automatizaciones del día a día.</p>
            </div>
          </div>

          {/* Miniatura 2 */}
          <div className="relative h-[238px] rounded-sm overflow-hidden group border border-gray-800/30">
            <img 
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop" 
              alt="Methodology" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-5">
              <h4 className="text-sm font-bold tracking-wider text-white uppercase">Metodología Ágil</h4>
              <p className="text-xs text-gray-400 mt-1">Planificación estructurada desde el diseño hasta el despliegue.</p>
            </div>
          </div>

        </div>

      </div>

    </section>
  )
}