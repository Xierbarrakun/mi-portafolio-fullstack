import { useEffect, useState } from "react"
import { supabase } from "./lib/supabaseClient"
import ProjectCard from "./ProjectCard"

export default function ProjectsSection() {
  // Guardamos los proyectos en el estado de React (empieza vacío)
  const [misProyectos, setMisProyectos] = useState([])
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    // Función asíncrona para consultar la base de datos en la nube
    async function obtenerProyectos() {
      try {
        setCargando(true)
        
        // Hacemos la consulta select a nuestra tabla de Supabase
        const { data, error } = await supabase
          .from("proyectos")
          .select("*")
          .order("id", { ascending: true })

        if (error) throw error
        
        // Guardamos los datos reales en el estado
        setMisProyectos(data || [])
      } catch (error) {
        console.error("Error cargando proyectos de Supabase:", error.message)
      } finally {
        setCargando(false)
      }
    }

    obtenerProyectos()
  }, []) // El arreglo vacío significa que solo se ejecutará una vez al cargar la web

  return (
    <section id="proyectos" className="bg-[#0d1117] px-10 py-24 border-b border-gray-800/40">
      
      <div className="mb-12">
        <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
          // Trabajos con código de vanguardia
        </p>
        <h2 className="text-4xl font-black tracking-tighter text-white uppercase sm:text-5xl">
          Proyectos <span className="text-[#ff5a36]">Destacados</span>
        </h2>
      </div>

      {/* Si está cargando los datos de la nube, mostramos un indicador limpio */}
      {cargando ? (
        <div className="flex justify-center items-center h-48 w-full">
          <p className="text-gray-400 font-bold tracking-widest animate-pulse uppercase text-sm">
            Conectando con la base de datos... ⚡
          </p>
        </div>
      ) : (
        /* Cuadrícula dinámica mapeando los datos de Supabase */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {misProyectos.map((proyecto) => (
            <ProjectCard 
              key={proyecto.id}
              id={proyecto.id}
              title={proyecto.title}
              description={proyecto.description}
              image={proyecto.image}
              tags={proyecto.tags}
              project_url={proyecto.project_url}
            />
          ))}
        </div>
      )}

    </section>
  )
}