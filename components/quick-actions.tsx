import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dumbbell, Plus, Utensils, Brain } from "lucide-react"

const actions = [
  {
    label: "Activité",
    icon: Dumbbell,
    color: "bg-chart-1/10 hover:bg-chart-1/20 text-chart-1",
  },
  {
    label: "Repas",
    icon: Utensils,
    color: "bg-chart-2/10 hover:bg-chart-2/20 text-chart-2",
  },
  {
    label: "Méditation",
    icon: Brain,
    color: "bg-chart-3/10 hover:bg-chart-3/20 text-chart-3",
  },
]

export function QuickActions() {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-foreground mb-1">Actions rapides</h2>
        <p className="text-sm text-muted-foreground">Enregistrer une activité</p>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <Button key={index} variant="ghost" className={`w-full justify-start gap-3 h-auto p-4 ${action.color}`}>
            <div className="p-2 rounded-lg bg-background">
              <action.icon className="w-5 h-5" />
            </div>
            <span className="font-medium">{action.label}</span>
            <Plus className="w-4 h-4 ml-auto" />
          </Button>
        ))}
      </div>
    </Card>
  )
}
