export default function ProjectCard({ id, title, description, image, tags, project_url }) {
  return (
    <article className="relative h-[450px] w-full overflow-hidden rounded-sm group cursor-pointer border border-gray-800/40">
      
      {/* Imagen de Fondo del Proyecto */}
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Capa Oscura (Overlay) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-[#0d1117]/60 to-transparent transition-all duration-500 group-hover:via-[#0d1117]/40" />

      {/* Contenido del Texto */}
      <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end transform transition-transform duration-500">
        
        <span className="text-xs font-bold tracking-widest text-[#ff5a36] uppercase mb-1">
          PROYECTO Nº{id}
        </span>
        
        <h3 className="text-2xl font-black tracking-tight text-white uppercase mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-gray-300 font-medium line-clamp-2 max-w-xs opacity-90 group-hover:opacity-100">
          {description}
        </p>

        {/* Tecnologías usadas */}
        <div className="flex gap-2 mt-4 flex-wrap opacity-0 max-h-0 overflow-hidden transition-all duration-500 group-hover:opacity-100 group-hover:max-h-20">
          {tags.map((tag, index) => (
            <span key={index} className="text-[10px] font-bold uppercase tracking-wider bg-white/10 text-white py-1 px-2 rounded-sm backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>

        {/* 🚀 NUEVO: Botón Dinámico hacia el Proyecto (Aparece solo si tiene URL) */}
        {project_url && (
          <a 
            href={project_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 text-xs font-bold tracking-widest text-center text-white uppercase border border-[#ff5a36] py-2 px-4 rounded-sm bg-[#ff5a36]/10 hover:bg-[#ff5a36] hover:text-white transition-all duration-300 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-12"
          >
            Ver Proyecto Live →
          </a>
        )}

      </div>

    </article>
  )
}