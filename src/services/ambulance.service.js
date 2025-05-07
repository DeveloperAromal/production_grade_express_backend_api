import { supabase } from "../config/supabaseClient.js";

export async function getAmbulance() {
  const { data, error } = await supabase.from("ambulance").select("*").eq("");

  if (error) throw error;
  return data;
}
