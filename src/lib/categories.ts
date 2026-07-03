import { supabase } from "./supabase";
import type { Category } from "./types";

export async function getAllCategories(): Promise<Category[]> {
  if (!supabase) return [];
  const { data } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });
  return data || [];
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!supabase) return null;
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getCategoryById(id: string): Promise<{ data?: Category | null; error?: string }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return { error: error.message };
  return { data };
}

export async function createCategory(input: Partial<Category>): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("categories").insert(input);
  if (error) return { error: error.message };
  return {};
}

export async function updateCategory(id: string, input: Partial<Category>): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("categories").update(input).eq("id", id);
  if (error) return { error: error.message };
  return {};
}

export async function deleteCategory(id: string): Promise<{ error?: string }> {
  if (!supabase) return { error: "Supabase not configured" };
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) return { error: error.message };
  return {};
}
