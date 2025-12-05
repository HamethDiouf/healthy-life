"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
 
const data = [
  { day: "Lun", steps: 8500, calories: 520 },
  { day: "Mar", steps: 7200, calories: 480 },
  { day: "Mer", steps: 9800, calories: 620 },
  { day: "Jeu", steps: 6500, calories: 420 },
  { day: "Ven", steps: 11200, calories: 680 },
  { day: "Sam", steps: 9500, calories: 590 },
  { day: "Dim", steps: 8542, calories: 542 },
]

export function ActivityChart() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Activité de la semaine</h2>
        <p className="text-sm text-muted-foreground">Vos pas et calories brûlées</p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSteps" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Area
            type="monotone"
            dataKey="steps"
            stroke="hsl(var(--chart-1))"
            fillOpacity={1}
            fill="url(#colorSteps)"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="calories"
            stroke="hsl(var(--chart-2))"
            fillOpacity={1}
            fill="url(#colorCalories)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-1" />
          <span className="text-sm text-muted-foreground">Pas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-chart-2" />
          <span className="text-sm text-muted-foreground">Calories</span>
        </div>
      </div>
    </Card>
  )
}
