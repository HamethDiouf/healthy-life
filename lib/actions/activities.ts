"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function getActivities(limit = 10) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from("activities")
    .select("*")
    .eq("user_id", user.id)
    .order("activity_date", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching activities:", error)
    return []
  }

  return data || []
}

export async function addActivity(formData: {
  activity_type: string
  duration_minutes: number
  distance_km?: number
  calories_burned?: number
  steps?: number
  notes?: string
  activity_date: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("activities").insert({
    user_id: user.id,
    ...formData,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/activity")
  revalidatePath("/")
  return { success: true }
}

export async function deleteActivity(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("activities").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/activity")
  revalidatePath("/")
  return { success: true }
}
