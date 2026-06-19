import { useState, useEffect } from "react";
import { supabase } from "./lib/supabaseClient";

export default function AdminDashboard({ user, onLogout }) {
  // --- ESTADOS PARA EL FORMULARIO ---
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  
  // --- ESTADOS DE CONTROL Y DATOS ---
  const [projects, setProjects] = useState([]); // Guarda la lista completa de proyectos de la BD
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  
  // MODO EDICIÓN: Guarda el ID del proyecto si estamos editando, o null si estamos creando uno nuevo
  const [editingId, setEditingId] = useState(null);

  // --- EFECTO INICIAL: Cargar los proyectos al entrar al panel ---
  useEffect(() => {
    fetchProjects();
  }, []);

  // Función para leer los datos de Supabase (.select)
  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("proyectos")
      .select("*"); // Quitamos el .order() porque no existe created_at

    if (error) {
      console.error("Error al traer datos de Supabase:", error.message);
    }

    if (data) {
      setProjects(data);
    }
  };

  // --- FUNCIÓN ACCIÓN CENTRAL: CREAR O ACTUALIZAR ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", msg: "" });

    // Limpiamos los tags de espacios extras
    const tagsArray = tagsInput.split(",").map(tag => tag.trim()).filter(tag => tag !== "");

    const projectData = {
      title,
      description,
      image,
      tags: tagsArray,
      project_url: projectUrl || null,
    };

    if (editingId) {
      // --- MODO EDITAR (.update) ---
      const { error } = await supabase
        .from("proyectos")
        .update(projectData)
        .eq("id", editingId); // Condición SQL: donde el id coincida

      if (error) {
        setStatus({ type: "error", msg: `Error al actualizar: ${error.message}` });
      } else {
        setStatus({ type: "success", msg: "¡Proyecto actualizado correctamente!" });
        resetForm();
      }
    } else {
      // --- MODO CREAR (.insert) ---
      const { error } = await supabase
        .from("proyectos")
        .insert([projectData]);

      if (error) {
        setStatus({ type: "error", msg: `Error al insertar: ${error.message}` });
      } else {
        setStatus({ type: "success", msg: "¡Nuevo proyecto publicado con éxito!" });
        resetForm();
      }
    }

    setLoading(false);
    fetchProjects(); // Recargamos la tabla con los datos frescos de la nube
  };

  // --- FUNCIÓN ACCIÓN: BORRAR PROYECTO (.delete) ---
  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este desarrollo para siempre?")) {
      const { error } = await supabase
        .from("proyectos")
        .delete()
        .eq("id", id);

      if (error) {
        setStatus({ type: "error", msg: `No se pudo eliminar: ${error.message}` });
      } else {
        setStatus({ type: "success", msg: "Proyecto eliminado del portafolio." });
        fetchProjects(); // Recargar la tabla
        if (editingId === id) resetForm(); // Si lo estaba editando, limpio el formulario
      }
    }
  };

  // --- FUNCIÓN ACCIÓN: CARGAR DATOS EN EL FORMULARIO PARA EDITAR ---
  const startEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setImage(project.image);
    setTagsInput(project.tags ? project.tags.join(", ") : "");
    setProjectUrl(project.project_url || "");
    window.scrollTo({ top: 0, behavior: "smooth" }); // Sube la pantalla suavemente al formulario
  };

  // Limpiar el formulario y apagar el modo edición
  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setImage("");
    setTagsInput("");
    setProjectUrl("");
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6 md:p-12 selection:bg-[#ff5a36]">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#ff5a36] uppercase block mb-1">
              Consola de Administración Avanzada
            </span>
            <h1 className="text-3xl font-black tracking-tight uppercase">Dashboard Ecosistema</h1>
            <p className="text-xs text-gray-400 mt-1">Operador activo: {user.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-[10px] font-bold tracking-widest uppercase border border-gray-800 py-2 px-4 rounded-sm hover:bg-red-600/10 hover:border-red-500 transition-all duration-300"
          >
            CERRAR SESIÓN ✕
          </button>
        </div>

        {/* METRIC CARD (INDICADOR DE TRABAJOS TOTALES) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#161b22] border border-gray-800 p-6 rounded-sm">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
              Desarrollos Publicados
            </span>
            <h2 className="text-4xl font-black text-[#ff5a36]">{projects.length}</h2>
          </div>
        </div>

        {/* NOTIFICACIONES */}
        {status.msg && (
          <div className={`p-4 rounded-sm text-xs font-bold uppercase tracking-wider mb-6 border text-center ${
            status.type === "success" ? "bg-green-500/10 border-green-500 text-green-400" : "bg-red-500/10 border-red-500 text-red-500"
          }`}>
            {status.msg}
          </div>
        )}

        {/* SECCIÓN DEL FORMULARIO DINÁMICO */}
        <div className="bg-[#161b22] border border-gray-800/60 p-8 rounded-sm mb-12">
          <div className="flex justify-between items-center border-b border-gray-800 pb-2 mb-6">
            <h3 className="text-sm font-bold tracking-tight uppercase text-gray-300">
              {editingId ? "⚡ MODIFICANDO PROYECTO SELECCIONADO" : "▲ REGISTRAR NUEVO DESARROLLO"}
            </h3>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-[9px] font-bold bg-gray-800 text-gray-300 py-1 px-3 rounded-sm hover:bg-gray-700 uppercase"
              >
                Cancelar Edición ✕
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Título del Proyecto</label>
                <input
                  type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-[#0d1117] border border-gray-800 p-3 text-sm text-white rounded-sm focus:outline-none focus:border-[#ff5a36]"
                  placeholder="Ej: E-Commerce System V2"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">URL de la Imagen de Fondo</label>
                <input
                  type="url" required value={image} onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-[#0d1117] border border-gray-800 p-3 text-sm text-white rounded-sm focus:outline-none focus:border-[#ff5a36]"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Tecnologías / Tags (Separadas por comas)</label>
                <input
                  type="text" required value={tagsInput} onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full bg-[#0d1117] border border-gray-800 p-3 text-sm text-white rounded-sm focus:outline-none focus:border-[#ff5a36]"
                  placeholder="React, Tailwind, Supabase"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Enlace Live / GitHub (Opcional)</label>
                <input
                  type="url" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)}
                  className="w-full bg-[#0d1117] border border-gray-800 p-3 text-sm text-white rounded-sm focus:outline-none focus:border-[#ff5a36]"
                  placeholder="https://github.com/..."
                />
              </div>

              <div className="md:row-span-2 flex flex-col h-full">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Descripción del Proyecto</label>
                <textarea
                  required rows="5" value={description} onChange={(e) => setDescription(e.target.value)}
                  className="w-full flex-1 bg-[#0d1117] border border-gray-800 p-3 text-sm text-white rounded-sm focus:outline-none focus:border-[#ff5a36] resize-none"
                  placeholder="Detalles técnicos..."
                />
              </div>
            </div>

            <div className="md:col-span-2 mt-2">
              <button
                type="submit" disabled={loading}
                className={`w-full text-xs font-bold tracking-widest text-center text-white uppercase py-4 rounded-sm transition-all duration-300 disabled:opacity-50 ${
                  editingId ? "bg-cyan-600 hover:bg-cyan-700" : "bg-[#ff5a36] hover:bg-[#e04e2e]"
                }`}
              >
                {loading ? "PROCESANDO CAMBIOS..." : editingId ? "GUARDAR CAMBIOS ACTUALIZADOS ✓" : "PUBLICAR NUEVO DESARROLLO EN VIVO ▲"}
              </button>
            </div>
          </form>
        </div>

        {/* TABLA DE GESTIÓN CENTRALIZADA */}
        <div className="bg-[#161b22] border border-gray-800/60 rounded-sm overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-sm font-bold tracking-tight uppercase text-gray-300">Catálogo de Proyectos Existentes</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#0d1117] border-b border-gray-800 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                  <th className="p-4">Imagen</th>
                  <th className="p-4">Título</th>
                  <th className="p-4 hidden md:table-cell">Tecnologías</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-xs text-gray-500 uppercase tracking-wider">
                      No hay proyectos en la base de datos.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id} className="hover:bg-[#1f242c]/40 transition-colors">
                      <td className="p-4">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-16 h-10 object-cover border border-gray-800 rounded-sm"
                          onError={(e) => { e.target.src = "https://placehold.co/150x100/161b22/ffffff?text=No+Image"; }}
                        />
                      </td>
                      <td className="p-4 font-bold text-white tracking-tight">
                        {project.title}
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.tags && project.tags.map((tag, idx) => (
                            <span key={idx} className="bg-[#0d1117] border border-gray-800 text-gray-400 text-[9px] font-medium px-2 py-0.5 rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => startEdit(project)}
                            className="text-[10px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 py-1.5 px-3 rounded-sm hover:bg-cyan-500 hover:text-white transition-all"
                          >
                            EDITAR
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/30 py-1.5 px-3 rounded-sm hover:bg-red-500 hover:text-white transition-all"
                          >
                            BORRAR
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}