"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Coffee, Salad, Utensils, IceCream, Trash2 } from "lucide-react"
import { getMeals, deleteMeal } from "@/lib/actions/nutrition"
import { useToast } from "@/hooks/use-toast"

const mealIcons = {
  breakfast: Coffee,
  lunch: Salad,
  dinner: Utensils,
  snack: IceCream,
}

const mealLabels = {
  breakfast: "Petit-déjeuner",
  lunch: "Déjeuner",
  dinner: "Dîner",
  snack: "Collation",
}

const mealColors = {
  breakfast: { color: "text-chart-4", bgColor: "bg-chart-4/10" },
  lunch: { color: "text-chart-2", bgColor: "bg-chart-2/10" },
  dinner: { color: "text-chart-1", bgColor: "bg-chart-1/10" },
  snack: { color: "text-chart-3", bgColor: "bg-chart-3/10" },
}

export function MealHistory() {
  const [meals, setMeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadMeals()
  }, [])

  const loadMeals = async () => {
    const result = await getMeals()
    if (result.data) {
      setMeals(result.data)
    }
    setLoading(false)
  }

  const handleDelete = async (mealId: string) => {
    const result = await deleteMeal(mealId)

    if (result.error) {
      toast({
        title: "Erreur",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Succès",
        description: "Repas supprimé",
      })
      loadMeals()
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-5">Repas d'aujourd'hui</h2>
        <p className="text-sm text-muted-foreground text-center py-8">Chargement...</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-5">Repas d'aujourd'hui</h2>

      {meals.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">Aucun repas enregistré aujourd'hui</p>
      ) : (
        <div className="space-y-3">
          {meals.map((meal) => {
            const Icon = mealIcons[meal.meal_type as keyof typeof mealIcons]
            const colors = mealColors[meal.meal_type as keyof typeof mealColors]
            const time = new Date(meal.meal_time).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })

            return (
              <div key={meal.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors">
                <div className={`p-3 rounded-lg ${colors.bgColor} flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {mealLabels[meal.meal_type as keyof typeof mealLabels]}
                      </h3>
                      <p className="text-sm text-muted-foreground">{time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-foreground">{meal.calories} cal</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(meal.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{meal.meal_name}</p>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    {meal.proteins && <span>Protéines: {meal.proteins}g</span>}
                    {meal.carbs && (
                      <>
                        <span>•</span>
                        <span>Glucides: {meal.carbs}g</span>
                      </>
                    )}
                    {meal.fats && (
                      <>
                        <span>•</span>
                        <span>Lipides: {meal.fats}g</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
