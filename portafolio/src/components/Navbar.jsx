export default function Navbar() {
  return (
    <nav className="w-full py-5 px-10 flex justify-between items-center border-b border-gray-800 bg-[#0d1117]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="text-xl font-bold tracking-wider text-white">
        PORTFOLIO<span className="text-[#ff5a36]">.</span>
      </div>
      <ul className="flex gap-8 text-sm font-medium text-gray-400">
        <li className="hover:text-white cursor-pointer transition-colors">Inicio</li>
        <li className="hover:text-white cursor-pointer transition-colors">Proyectos</li>
        <li className="hover:text-white cursor-pointer transition-colors">Sobre mí</li>
        <li className="hover:text-white cursor-pointer transition-colors">Contacto</li>
      </ul>
      <div className="text-gray-400 hover:text-white cursor-pointer">
        🔍
      </div>
    </nav>
  )
}