import { Card } from "@/components/ui/card"
import { Lightbulb, ThumbsUp, AlertTriangle } from "lucide-react"

const insights = [
  {
    type: "success",
    icon: ThumbsUp,
    title: "Excellente régularité",
    description: "Vous vous couchez et réveillez à des heures similaires chaque jour.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    type: "tip",
    icon: Lightbulb,
    title: "Conseil",
    description: "Essayez de dormir 30 minutes de plus pour atteindre vos 8 heures.",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    type: "warning",
    icon: AlertTriangle,
    title: "Attention",
    description: "Votre sommeil du vendredi est souvent plus court. Pensez à vous coucher plus tôt.",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

const phases = [
  { label: "Sommeil léger", percentage: 45, color: "bg-chart-2" },
  { label: "Sommeil profond", percentage: 30, color: "bg-chart-1" },
  { label: "Sommeil paradoxal", percentage: 20, color: "bg-chart-3" },
  { label: "Éveillé", percentage: 5, color: "bg-chart-4" },
]

export function SleepQuality() {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-5">Phases du sommeil</h2>

        <div className="space-y-4">
          {phases.map((phase, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{phase.label}</span>
                <span className="text-sm font-bold text-foreground">{phase.percentage}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${phase.color} rounded-full transition-all duration-500`}
                  style={{ width: `${phase.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-accent/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium text-foreground">Score de qualité</span>
            <span className="text-2xl font-bold text-primary">85/100</span>
          </div>
          <p className="text-xs text-muted-foreground">Votre sommeil est de très bonne qualité</p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-5">Analyses et conseils</h2>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div key={index} className={`p-3 rounded-lg ${insight.bgColor}`}>
              <div className="flex items-start gap-3">
                <insight.icon className={`w-5 h-5 ${insight.color} flex-shrink-0 mt-0.5`} />
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-1">{insight.title}</h3>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
