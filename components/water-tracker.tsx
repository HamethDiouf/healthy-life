"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplet, Plus, Minus } from "lucide-react"

export function WaterTracker() {
  const [glasses, setGlasses] = useState(6)
  const target = 8
  const percentage = Math.round((glasses / target) * 100)

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Droplet className="w-5 h-5 text-chart-2" />
          <h2 className="text-lg font-bold text-foreground">Hydratation</h2>
        </div>

        <div className="flex flex-col items-center py-6">
          <div className="relative w-32 h-32 mb-6">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="56" stroke="hsl(var(--muted))" strokeWidth="12" fill="none" />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="hsl(var(--chart-2))"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - percentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-foreground">{glasses}</span>
              <span className="text-xs text-muted-foreground">/ {target} verres</span>
            </div>
          </div>

          <p className="text-sm text-center text-muted-foreground mb-6">
            {glasses >= target
              ? "Objectif atteint ! Excellent travail."
              : `Plus que ${target - glasses} verre${target - glasses > 1 ? "s" : ""} pour atteindre votre objectif.`}
          </p>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGlasses(Math.max(0, glasses - 1))}
              disabled={glasses === 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <Button className="gap-2" onClick={() => setGlasses(glasses + 1)}>
              <Plus className="w-4 h-4" />
              Ajouter un verre
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGlasses(Math.max(0, glasses - 1))}
              disabled={glasses === 0}
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 mt-4">
          {Array.from({ length: target }).map((_, index) => (
            <div
              key={index}
              className={`h-12 rounded-lg flex items-center justify-center transition-colors ${
                index < glasses ? "bg-chart-2 text-chart-2-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <Droplet className={`w-5 h-5 ${index < glasses ? "fill-current" : ""}`} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Conseils nutrition</h2>

        <div className="space-y-3">
          <div className="p-3 rounded-lg bg-primary/10">
            <p className="text-sm font-medium text-foreground mb-1">Excellent équilibre</p>
            <p className="text-xs text-muted-foreground">Vos repas sont bien équilibrés aujourd'hui.</p>
          </div>

          <div className="p-3 rounded-lg bg-chart-2/10">
            <p className="text-sm font-medium text-foreground mb-1">Hydratation régulière</p>
            <p className="text-xs text-muted-foreground">
              Continuez à boire de l'eau régulièrement tout au long de la journée.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-chart-3/10">
            <p className="text-sm font-medium text-foreground mb-1">Variété des aliments</p>
            <p className="text-xs text-muted-foreground">Essayez d'intégrer plus de légumes verts à vos repas.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
