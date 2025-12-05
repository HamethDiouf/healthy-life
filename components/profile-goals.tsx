import { Card } from "@/components/ui/card"
import { Target } from "lucide-react"

const goals = [
  { label: "Poids cible", current: "68 kg", target: "65 kg", progress: 60 },
  { label: "Pas quotidiens", current: "8,500", target: "10,000", progress: 85 },
  { label: "Calories", current: "1,842", target: "1,800", progress: 97 },
]

export function ProfileGoals() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <Target className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Mes objectifs</h2>
      </div>

      <div className="space-y-4">
        {goals.map((goal, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{goal.label}</span>
              <span className="text-xs text-muted-foreground">
                {goal.current} / {goal.target}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
