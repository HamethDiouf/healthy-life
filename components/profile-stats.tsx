import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    label: "Poids actuel",
    value: "68 kg",
    change: "-2.5 kg",
    trend: "down",
    color: "text-primary",
  },
  {
    label: "IMC",
    value: "22.8",
    change: "+0.2",
    trend: "up",
    color: "text-chart-2",
  },
  {
    label: "Fréquence cardiaque moy.",
    value: "72 bpm",
    change: "-3 bpm",
    trend: "down",
    color: "text-chart-1",
  },
  {
    label: "Calories moy. / jour",
    value: "1,842",
    change: "+120",
    trend: "up",
    color: "text-chart-4",
  },
]

export function ProfileStats() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-5">Statistiques de santé</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="p-4 rounded-lg bg-accent/30">
            <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
            <div className="flex items-baseline justify-between">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${stat.trend === "down" ? "text-primary" : "text-muted-foreground"}`}
              >
                {stat.trend === "down" ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
