import { supabase } from "../supabaseClient";

// Get Tasks of the User
export async function fetchTasks(userId) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

// Create a Task
export async function createTask(userId, payload) {
  const { data, error } = await supabase
    .from("tasks")
    .insert([{ user_id: userId, ...payload }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Delete a Task
export async function deleteTask(taskId) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  if (error) throw error;
  return true;
}

// Mark a Task as Completed
export async function markComplete(taskId) {
  const nowISO = new Date().toISOString();
  const { data, error } = await supabase
    .from("tasks")
    .update({ end_date: nowISO, updated_at: nowISO })
    .eq("id", taskId)
    .single();

  if (error) throw error;
  return data;
}
