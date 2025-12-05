"use server"

import { createServerClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getReminders() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Non authentifié" }
  }

  const { data, error } = await supabase
    .from("reminders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching reminders:", error)
    return { error: error.message }
  }

  return { data }
}

export async function createReminder(reminderData: {
  reminder_type: string
  title: string
  description?: string
  reminder_time: string
  days_of_week?: number[]
}) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Non authentifié" }
  }

  const { data, error } = await supabase
    .from("reminders")
    .insert({
      user_id: user.id,
      ...reminderData,
    })
    .select()
    .single()

  if (error) {
    console.error("Error creating reminder:", error)
    return { error: error.message }
  }

  revalidatePath("/reminders")
  return { data }
}

export async function toggleReminder(reminderId: string, isEnabled: boolean) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Non authentifié" }
  }

  const { error } = await supabase
    .from("reminders")
    .update({ is_enabled: isEnabled })
    .eq("id", reminderId)
    .eq("user_id", user.id)

  if (error) {
    console.error("Error toggling reminder:", error)
    return { error: error.message }
  }

  revalidatePath("/reminders")
  return { success: true }
}

export async function deleteReminder(reminderId: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Non authentifié" }
  }

  const { error } = await supabase.from("reminders").delete().eq("id", reminderId).eq("user_id", user.id)

  if (error) {
    console.error("Error deleting reminder:", error)
    return { error: error.message }
  }

  revalidatePath("/reminders")
  return { success: true }
}
