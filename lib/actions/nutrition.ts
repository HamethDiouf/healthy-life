"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export async function getMeals(limit = 20) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return []

  const { data, error } = await supabase
    .from("meals")
    .select("*")
    .eq("user_id", user.id)
    .order("meal_date", { ascending: false })
    .order("meal_time", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Error fetching meals:", error)
    return []
  }

  return data || []
}

export async function addMeal(formData: {
  meal_type: string
  meal_name: string
  calories: number
  proteins?: number
  carbs?: number
  fats?: number
  fruits_vegetables?: number
  notes?: string
  meal_date: string
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("meals").insert({
    user_id: user.id,
    ...formData,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/nutrition")
  revalidatePath("/")
  return { success: true }
}

export async function deleteMeal(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const { error } = await supabase.from("meals").delete().eq("id", id).eq("user_id", user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/nutrition")
  revalidatePath("/")
  return { success: true }
}

export async function getWaterIntake(date: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return 0

  const { data, error } = await supabase
    .from("water_intake")
    .select("amount_ml")
    .eq("user_id", user.id)
    .eq("intake_date", date)

  if (error) {
    console.error("Error fetching water intake:", error)
    return 0
  }

  return data.reduce((total, record) => total + record.amount_ml, 0)
}

export async function addWaterIntake(amount_ml: number) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Not authenticated" }
  }

  const today = new Date().toISOString().split("T")[0]

  const { error } = await supabase.from("water_intake").insert({
    user_id: user.id,
    amount_ml,
    intake_date: today,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/nutrition")
  return { success: true }
}
