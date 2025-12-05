import { Card } from "@/components/ui/card"
import { Moon, CloudMoon, Sunrise, Clock } from "lucide-react"

const stats = [
  {
    label: "Sommeil cette nuit",
    value: "7h 30m",
    icon: Moon,
    subtext: "Objectif: 8h",
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    progress: 94,
  },
  {
    label: "Sommeil profond",
    value: "2h 15m",
    icon: CloudMoon,
    subtext: "30% du total",
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    progress: 30,
  },
  {
    label: "Heure de réveil",
    value: "07:15",
    icon: Sunrise,
    subtext: "Dans la fenêtre idéale",
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    progress: 100,
  },
  {
    label: "Temps d'endormissement",
    value: "12 min",
    icon: Clock,
    subtext: "Très bon",
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    progress: 85,
  },
]

export function SleepOverview() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.subtext}</p>
          </div>
        </Card>
      ))}
    </div>
  )
}
