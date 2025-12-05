import { Card } from "@/components/ui/card"
import { Activity, Utensils, Moon, Dumbbell } from "lucide-react"

const activities = [
  {
    type: "Exercice",
    description: "Course à pied - 5 km",
    time: "Il y a 2 heures",
    icon: Dumbbell,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    type: "Repas",
    description: "Déjeuner sain - 650 cal",
    time: "Il y a 4 heures",
    icon: Utensils,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    type: "Activité",
    description: "Marche rapide - 3,200 pas",
    time: "Il y a 6 heures",
    icon: Activity,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
  {
    type: "Sommeil",
    description: "Nuit complète - 7h 30m",
    time: "Hier soir",
    icon: Moon,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
]

export function RecentActivity() {
  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-foreground mb-1">Activité récente</h2>
        <p className="text-sm text-muted-foreground">Vos dernières entrées</p>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
          >
            <div className={`p-2.5 rounded-lg ${activity.bgColor} flex-shrink-0`}>
              <activity.icon className={`w-5 h-5 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground mb-0.5">{activity.type}</p>
              <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
