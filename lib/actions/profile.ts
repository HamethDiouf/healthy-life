"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function getProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (error) {
    console.error("Error fetching profile:", error)
    return null
  }

  return data
}

export async function updateProfile(formData: {
  display_name: string
  birth_date?: string
  height?: number
  weight?: number
  gender?: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      display_name: formData.display_name,
      birth_date: formData.birth_date || null,
      height: formData.height || null,
      weight: formData.weight || null,
      gender: formData.gender || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/profile")
  return { success: true }
}
