"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from "recharts"

const weeklyData = [
  { day: "Lun", hours: 7.5, quality: 85 },
  { day: "Mar", hours: 6.8, quality: 72 },
  { day: "Mer", hours: 8.2, quality: 92 },
  { day: "Jeu", hours: 7.0, quality: 78 },
  { day: "Ven", hours: 6.5, quality: 68 },
  { day: "Sam", hours: 9.0, quality: 95 },
  { day: "Dim", hours: 7.5, quality: 85 },
]

const monthlyData = [
  { week: "S1", avgHours: 7.2, quality: 80 },
  { week: "S2", avgHours: 7.5, quality: 85 },
  { week: "S3", avgHours: 6.9, quality: 75 },
  { week: "S4", avgHours: 7.5, quality: 84 },
]

const getBarColor = (quality: number) => {
  if (quality >= 85) return "hsl(var(--chart-1))"
  if (quality >= 70) return "hsl(var(--chart-2))"
  return "hsl(var(--chart-4))"
}

export function SleepChart() {
  return (
    <Card className="p-6">
      <Tabs defaultValue="week" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Analyse du sommeil</h2>
            <p className="text-sm text-muted-foreground">Durée et qualité de votre repos</p>
          </div>
          <TabsList>
            <TabsTrigger value="week">Semaine</TabsTrigger>
            <TabsTrigger value="month">Mois</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="week" className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Moyenne / nuit</p>
              <p className="text-2xl font-bold text-chart-3">7h 36m</p>
              <p className="text-xs text-muted-foreground mt-1">95% de l'objectif</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Qualité moyenne</p>
              <p className="text-2xl font-bold text-primary">82%</p>
              <p className="text-xs text-muted-foreground mt-1">Bonne qualité</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Régularité</p>
              <p className="text-2xl font-bold text-chart-2">88%</p>
              <p className="text-xs text-muted-foreground mt-1">Très régulier</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Heures de sommeil par jour</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                  formatter={(value: number, name: string) => {
                    if (name === "hours") {
                      const hours = Math.floor(value)
                      const minutes = Math.round((value - hours) * 60)
                      return [`${hours}h ${minutes}m`, "Durée"]
                    }
                    return [value, name]
                  }}
                />
                <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
                  {weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.quality)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-1" />
                <span className="text-muted-foreground">Excellent (85%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-2" />
                <span className="text-muted-foreground">Bon (70-84%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-chart-4" />
                <span className="text-muted-foreground">À améliorer (&lt;70%)</span>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="month" className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Total ce mois</p>
              <p className="text-2xl font-bold text-chart-3">225h 30m</p>
              <p className="text-xs text-muted-foreground mt-1">30 nuits enregistrées</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Meilleure nuit</p>
              <p className="text-2xl font-bold text-primary">9h 15m</p>
              <p className="text-xs text-muted-foreground mt-1">Samedi dernier</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Qualité moy.</p>
              <p className="text-2xl font-bold text-chart-2">81%</p>
              <p className="text-xs text-muted-foreground mt-1">+3% vs mois dernier</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Moyenne hebdomadaire</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="avgHours" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
