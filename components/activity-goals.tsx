import { Card } from "@/components/ui/card"
import { Trophy } from "lucide-react"

const goals = [
  {
    title: "Objectif hebdomadaire",
    current: 61242,
    target: 70000,
    unit: "pas",
    progress: 87,
  },
  {
    title: "Distance mensuelle",
    current: 182,
    target: 200,
    unit: "km",
    progress: 91,
  },
  {
    title: "Calories à brûler",
    current: 14252,
    target: 15000,
    unit: "cal",
    progress: 95,
  },
]

export function ActivityGoals() {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-5">
        <Trophy className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Objectifs</h2>
      </div>

      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={index}>
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold text-foreground">{goal.title}</span>
                <span className="text-sm font-bold text-primary">{goal.progress}%</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {goal.current.toLocaleString()} / {goal.target.toLocaleString()} {goal.unit}
              </p>
            </div>

            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/10">
        <p className="text-sm font-medium text-primary text-center">
          Plus que 8,758 pas pour atteindre votre objectif hebdomadaire !
        </p>
      </div>
    </Card>
  )
}
