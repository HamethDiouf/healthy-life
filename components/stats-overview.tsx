"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Activity, Footprints, Moon, Utensils } from "lucide-react"
import { getDashboardStats } from "@/lib/actions/stats"

const statConfig = [
  {
    key: "steps",
    label: "Pas aujourd'hui",
    icon: Footprints,
    color: "text-chart-1",
    bgColor: "bg-chart-1/10",
  },
  {
    key: "caloriesBurned",
    label: "Calories brûlées",
    icon: Activity,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    key: "sleep",
    label: "Sommeil",
    icon: Moon,
    color: "text-chart-3",
    bgColor: "bg-chart-3/10",
  },
  {
    key: "calories",
    label: "Calories ingérées",
    icon: Utensils,
    color: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
]

export function StatsOverview() {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    const result = await getDashboardStats()
    if (result.data) {
      setStats(result.data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statConfig.map((config, index) => (
          <Card key={index} className="p-5">
            <div className="animate-pulse">
              <div className="h-10 bg-muted rounded mb-4" />
              <div className="h-4 bg-muted rounded mb-2" />
              <div className="h-8 bg-muted rounded" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statConfig.map((config, index) => {
        const stat = stats?.[config.key]
        const displayValue =
          config.key === "sleep"
            ? `${Math.floor(stat?.value || 0)}h ${Math.round(((stat?.value || 0) % 1) * 60)}m`
            : (stat?.value || 0).toLocaleString()

        const displayGoal = config.key === "sleep" ? `${stat?.goal || 8}h` : (stat?.goal || 0).toLocaleString()

        return (
          <Card key={index} className="p-5">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-2.5 rounded-lg ${config.bgColor}`}>
                <config.icon className={`w-5 h-5 ${config.color}`} />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{stat?.percentage || 0}%</span>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{config.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-foreground">{displayValue}</p>
                <p className="text-sm text-muted-foreground">/ {displayGoal}</p>
              </div>
            </div>

            <div className="mt-3 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${config.color.replace("text-", "bg-")} rounded-full transition-all duration-500`}
                style={{ width: `${stat?.percentage || 0}%` }}
              />
            </div>
          </Card>
        )
      })}
    </div>
  )
}
