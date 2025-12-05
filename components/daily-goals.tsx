import { Card } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"

const goals = [
  { id: 1, text: "Marcher 10,000 pas", completed: false, progress: 85 },
  { id: 2, text: "Boire 8 verres d'eau", completed: true, progress: 100 },
  { id: 3, text: "Méditer 15 minutes", completed: true, progress: 100 },
  { id: 4, text: "Dormir 8 heures", completed: false, progress: 0 },
  { id: 5, text: "Manger 5 fruits/légumes", completed: false, progress: 60 },
]

export function DailyGoals() {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-foreground mb-1">Objectifs du jour</h2>
        <p className="text-sm text-muted-foreground">3 sur 5 complétés</p>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
          >
            {goal.completed ? (
              <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${goal.completed ? "text-muted-foreground line-through" : "text-foreground"}`}
              >
                {goal.text}
              </p>
              {!goal.completed && goal.progress > 0 && (
                <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
