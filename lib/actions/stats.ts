"use server"

import { createServerClient } from "@/lib/supabase/server"

export async function getDashboardStats() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Non authentifié" }
  }

  const today = new Date().toISOString().split("T")[0]

  // Get today's activities
  const { data: activities } = await supabase
    .from("activities")
    .select("steps, calories_burned")
    .eq("user_id", user.id)
    .eq("activity_date", today)

  // Get today's sleep
  const { data: sleep } = await supabase
    .from("sleep_records")
    .select("duration_hours")
    .eq("user_id", user.id)
    .eq("sleep_date", today)
    .single()

  // Get today's meals
  const { data: meals } = await supabase.from("meals").select("calories").eq("user_id", user.id).eq("meal_date", today)

  // Get active goals
  const { data: goals } = await supabase.from("goals").select("*").eq("user_id", user.id).eq("is_active", true)

  // Calculate totals
  const totalSteps = activities?.reduce((sum, a) => sum + (a.steps || 0), 0) || 0
  const totalCaloriesBurned = activities?.reduce((sum, a) => sum + (a.calories_burned || 0), 0) || 0
  const sleepHours = sleep?.duration_hours || 0
  const totalCaloriesIngested = meals?.reduce((sum, m) => sum + m.calories, 0) || 0

  // Get goals
  const stepsGoal = goals?.find((g) => g.goal_type === "steps")?.target_value || 10000
  const caloriesBurnedGoal = goals?.find((g) => g.goal_type === "calories")?.target_value || 650
  const sleepGoal = goals?.find((g) => g.goal_type === "sleep")?.target_value || 8
  const caloriesGoal = goals?.find((g) => g.goal_type === "exercise")?.target_value || 2000

  return {
    data: {
      steps: {
        value: totalSteps,
        goal: stepsGoal,
        percentage: Math.min(Math.round((totalSteps / stepsGoal) * 100), 100),
      },
      caloriesBurned: {
        value: totalCaloriesBurned,
        goal: caloriesBurnedGoal,
        percentage: Math.min(Math.round((totalCaloriesBurned / caloriesBurnedGoal) * 100), 100),
      },
      sleep: {
        value: sleepHours,
        goal: sleepGoal,
        percentage: Math.min(Math.round((sleepHours / sleepGoal) * 100), 100),
      },
      calories: {
        value: totalCaloriesIngested,
        goal: caloriesGoal,
        percentage: Math.min(Math.round((totalCaloriesIngested / caloriesGoal) * 100), 100),
      },
    },
  }
}

export async function getWeeklyActivityData() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: "Non authentifié" }
  }

  const today = new Date()
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(today.getDate() - 7)

  const { data: activities } = await supabase
    .from("activities")
    .select("activity_date, steps, calories_burned")
    .eq("user_id", user.id)
    .gte("activity_date", sevenDaysAgo.toISOString().split("T")[0])
    .order("activity_date", { ascending: true })

  return { data: activities || [] }
}
