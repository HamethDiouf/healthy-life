"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function getSleepRecords(limit = 20) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from("sleep_records")
    .select("*")
    .eq("user_id", user.id)
    .order("sleep_date", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching sleep records:", error)
    return []
  }

  return data || []
}

export async function addSleepRecord(formData: {
  sleep_date: string
  bedtime: string
  wake_time: string
  duration_hours: number
  quality: string
  deep_sleep_hours?: number
  light_sleep_hours?: number
  rem_sleep_hours?: number
  awake_hours?: number
  notes?: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("sleep_records").insert({
    user_id: user.id,
    ...formData,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/sleep")
  revalidatePath("/")
  return { success: true }
}

export async function deleteSleepRecord(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("sleep_records").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/sleep")
  revalidatePath("/")
  return { success: true }
}
