export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-76px)] flex flex-col justify-between px-10 py-12 bg-cover bg-center bg-no-repeat"
      style={{ 
        // Metemos una imagen de fondo de Tokyo o de código. El gradiente negro encima es CLAVE para que se vea premium.
        backgroundImage: `linear-gradient(to bottom, rgba(13, 17, 23, 0.4), rgba(13, 17, 23, 0.95)), url('https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1920&q=80')` 
      }}
    >
      
      {/* CONTENIDO CENTRAL (Flexbox para separar Texto e Indicador Lateral) */}
      <div className="flex justify-between items-center my-auto w-full">
        
        {/* Textos Gigantes (Efecto VISIT TOKYO) */}
        <div className="max-w-4xl select-none">
          <h1 className="text-7xl font-black tracking-tighter text-white leading-none sm:text-8xl md:text-9xl uppercase">
            Creative<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">Developer</span>
          </h1>
          <p className="text-gray-400 mt-6 text-lg max-w-md font-medium tracking-wide">
            Especialista en soluciones Full Stack, arquitectura de software y experiencias multimedia interactivas.
          </p>
        </div>

        {/* Indicador Numérico Flotante a la Derecha */}
        <div className="hidden md:flex flex-col items-center gap-4 text-xs font-bold tracking-widest text-gray-500">
          <span className="hover:text-white cursor-pointer transition-colors">01</span>
          <span className="hover:text-white cursor-pointer transition-colors">02</span>
          <div className="flex items-center gap-2 text-white">
            <span className="text-lg font-black text-[#ff5a36]">03</span>
            <div className="w-8 h-[2px] bg-[#ff5a36]"></div>
          </div>
          <span className="hover:text-white cursor-pointer transition-colors">04</span>
          <span className="hover:text-white cursor-pointer transition-colors">05</span>
        </div>

      </div>

      {/* FILA INFERIOR DE 3 COLUMNAS (Manejo del Stack y Características) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-gray-800/60 pt-8 backend-features">
        
        {/* Característica 1 */}
        <div className="group cursor-pointer">
          <div className="flex items-center gap-3 text-gray-400 group-hover:text-[#ff5a36] transition-colors mb-2">
            <span className="text-xl">💻</span>
            <h3 className="font-bold tracking-wider text-sm text-white uppercase">Frontend Architect</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Construcción de interfaces interactivas, modulares y veloces usando React, Vite y Tailwind CSS.
          </p>
          <div className="w-0 h-[1px] bg-[#ff5a36] mt-4 group-hover:w-full transition-all duration-300"></div>
        </div>

        {/* Característica 2 */}
        <div className="group cursor-pointer">
          <div className="flex items-center gap-3 text-gray-400 group-hover:text-[#ff5a36] transition-colors mb-2">
            <span className="text-xl">⚙️</span>
            <h3 className="font-bold tracking-wider text-sm text-white uppercase">Backend & Databases</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Creación de APIs robustas, automatizaciones en Python y gestión de datos con Supabase y PostgreSQL.
          </p>
          <div className="w-0 h-[1px] bg-[#ff5a36] mt-4 group-hover:w-full transition-all duration-300"></div>
        </div>

        {/* Característica 3 */}
        <div className="group cursor-pointer">
          <div className="flex items-center gap-3 text-gray-400 group-hover:text-[#ff5a36] transition-colors mb-2">
            <span className="text-xl">🎮</span>
            <h3 className="font-bold tracking-wider text-sm text-white uppercase">Content & Interaction</h3>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Desarrollo de lógicas dinámicas y diseño pensado para el impacto visual y la retención del usuario.
          </p>
          <div className="w-0 h-[1px] bg-[#ff5a36] mt-4 group-hover:w-full transition-all duration-300"></div>
        </div>

      </div>

    </section>
  )
}