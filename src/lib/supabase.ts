import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Tree {
  id: string;
  code: string;
  name: string;
  scientific_name: string;
  family: string;
  description: string;
  characteristics: string;
  habitat: string;
  uses: string;
  image_url: string;
  height_range: string;
  created_at: string;
}
