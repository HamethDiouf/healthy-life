"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart } from "recharts"

const weeklyData = [
  { day: "Lun", steps: 8500, distance: 6.5, calories: 520, duration: 45 },
  { day: "Mar", steps: 7200, distance: 5.8, calories: 480, duration: 38 },
  { day: "Mer", steps: 9800, distance: 7.2, calories: 620, duration: 52 },
  { day: "Jeu", steps: 6500, distance: 5.0, calories: 420, duration: 35 },
  { day: "Ven", steps: 11200, distance: 8.5, calories: 680, duration: 62 },
  { day: "Sam", steps: 9500, distance: 7.0, calories: 590, duration: 48 },
  { day: "Dim", steps: 8542, distance: 6.8, calories: 542, duration: 46 },
]

const monthlyData = [
  { week: "S1", steps: 54000, distance: 42, calories: 3200 },
  { week: "S2", steps: 62000, distance: 48, calories: 3800 },
  { week: "S3", steps: 58000, distance: 45, calories: 3500 },
  { week: "S4", steps: 61342, distance: 47.3, calories: 3752 },
]

export function ActivityOverview() {
  return (
    <Card className="p-6">
      <Tabs defaultValue="week" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Vue d'ensemble</h2>
            <p className="text-sm text-muted-foreground">Statistiques de votre activité</p>
          </div>
          <TabsList>
            <TabsTrigger value="week">Semaine</TabsTrigger>
            <TabsTrigger value="month">Mois</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="week" className="space-y-6">
          {/* Weekly Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Total pas</p>
              <p className="text-2xl font-bold text-primary">61,242</p>
              <p className="text-xs text-muted-foreground mt-1">+12% vs sem. dernière</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Distance</p>
              <p className="text-2xl font-bold text-chart-2">46.8 km</p>
              <p className="text-xs text-muted-foreground mt-1">+8% vs sem. dernière</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Calories</p>
              <p className="text-2xl font-bold text-chart-1">3,852</p>
              <p className="text-xs text-muted-foreground mt-1">+15% vs sem. dernière</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Durée</p>
              <p className="text-2xl font-bold text-chart-4">5h 26m</p>
              <p className="text-xs text-muted-foreground mt-1">+10% vs sem. dernière</p>
            </div>
          </div>

          {/* Steps Chart */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Pas quotidiens</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Bar dataKey="steps" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="month" className="space-y-6">
          {/* Monthly Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Total pas</p>
              <p className="text-2xl font-bold text-primary">235,342</p>
              <p className="text-xs text-muted-foreground mt-1">Moyenne: 7,845 / jour</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Distance totale</p>
              <p className="text-2xl font-bold text-chart-2">182.3 km</p>
              <p className="text-xs text-muted-foreground mt-1">Moyenne: 6.1 km / jour</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Calories brûlées</p>
              <p className="text-2xl font-bold text-chart-1">14,252</p>
              <p className="text-xs text-muted-foreground mt-1">Moyenne: 475 / jour</p>
            </div>
          </div>

          {/* Monthly Progress Chart */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Progression mensuelle</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="steps"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
