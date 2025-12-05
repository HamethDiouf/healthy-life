import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { NutritionHeader } from "@/components/nutrition-header"
import { NutritionOverview } from "@/components/nutrition-overview"
import { MacrosChart } from "@/components/macros-chart"
import { MealHistory } from "@/components/meal-history"
import { WaterTracker } from "@/components/water-tracker"
import { AddMealButton } from "@/components/add-meal-button"

export default async function NutritionPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <NutritionHeader />

      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Nutrition</h1>
            <p className="text-muted-foreground">Suivez votre alimentation et hydratation</p>
          </div>
          <AddMealButton />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <NutritionOverview />
            <MacrosChart />
            <MealHistory />
          </div>
          <div>
            <WaterTracker />
          </div>
        </div>
      </main>
    </div>
  )
}
