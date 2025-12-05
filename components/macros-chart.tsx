"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Bar, BarChart, XAxis, YAxis } from "recharts"

const todayMacros = [
  { name: "Protéines", value: 340, percentage: 25, color: "hsl(var(--chart-2))" },
  { name: "Glucides", value: 840, percentage: 46, color: "hsl(var(--chart-3))" },
  { name: "Lipides", value: 520, percentage: 29, color: "hsl(var(--chart-1))" },
]

const weeklyData = [
  { day: "Lun", calories: 1950, protein: 92, carbs: 215, fat: 65 },
  { day: "Mar", calories: 1820, protein: 85, carbs: 198, fat: 62 },
  { day: "Mer", calories: 2100, protein: 98, carbs: 245, fat: 72 },
  { day: "Jeu", calories: 1890, protein: 88, carbs: 208, fat: 64 },
  { day: "Ven", calories: 2050, protein: 95, carbs: 228, fat: 68 },
  { day: "Sam", calories: 2200, protein: 102, carbs: 252, fat: 75 },
  { day: "Dim", calories: 1842, protein: 85, carbs: 210, fat: 58 },
]

export function MacrosChart() {
  return (
    <Card className="p-6">
      <Tabs defaultValue="today" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Répartition nutritionnelle</h2>
            <p className="text-sm text-muted-foreground">Analyse de vos macronutriments</p>
          </div>
          <TabsList>
            <TabsTrigger value="today">Aujourd'hui</TabsTrigger>
            <TabsTrigger value="week">Semaine</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="today" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={todayMacros}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {todayMacros.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                    formatter={(value: number) => `${value} cal`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              {todayMacros.map((macro, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: macro.color }} />
                      <span className="text-sm font-medium text-foreground">{macro.name}</span>
                    </div>
                    <span className="text-sm font-bold text-foreground">{macro.percentage}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${macro.percentage}%`, backgroundColor: macro.color }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{macro.value} calories</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="week" className="space-y-6">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Calories moy.</p>
              <p className="text-2xl font-bold text-chart-1">1,979</p>
              <p className="text-xs text-muted-foreground mt-1">par jour</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Protéines moy.</p>
              <p className="text-2xl font-bold text-chart-2">92g</p>
              <p className="text-xs text-muted-foreground mt-1">par jour</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/30">
              <p className="text-sm text-muted-foreground mb-1">Équilibre</p>
              <p className="text-2xl font-bold text-primary">88%</p>
              <p className="text-xs text-muted-foreground mt-1">bien équilibré</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Calories hebdomadaires</h3>
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
                <Bar dataKey="calories" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  )
}
