import { createClient } from '@supabase/supabase-js'

// Estas variables leerán las credenciales secretas de tu proyecto de forma segura
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)