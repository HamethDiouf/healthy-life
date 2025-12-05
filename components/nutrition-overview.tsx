import { Card } from "@/components/ui/card"
import { Flame, Target, TrendingUp, Apple } from "lucide-react"

const stats = [
  {
    label: "Calories consommées",
    value: "1,842",
    target: "2,000",
    icon: Flame,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
    progress: 92,
  },
  {
    label: "Protéines",
    value: "85g",
    target: "100g",
    icon: Target,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
    progress: 85,
  },
  {
    label: "Glucides",
    value: "210g",
    target: "250g",
    icon: TrendingUp,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
    progress: 84,
  },
  {
    label: "Fruits & Légumes",
    value: "4",
    target: "5",
    icon: Apple,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
    progress: 80,
  },
]

export function NutritionOverview() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-2.5 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <span className="text-xs font-medium text-muted-foreground">{stat.progress}%</span>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">/ {stat.target}</p>
            </div>
          </div>

          <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${stat.color.replace("text-", "bg-")} rounded-full transition-all duration-500`}
              style={{ width: `${stat.progress}%` }}
            />
          </div>
        </Card>
      ))}
    </div>
  )
}
