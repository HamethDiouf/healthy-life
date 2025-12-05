"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Moon, TrendingUp, TrendingDown, Trash2 } from "lucide-react"
import { getSleepRecords, deleteSleepRecord } from "@/lib/actions/sleep"
import { useToast } from "@/hooks/use-toast"

const getQualityColor = (quality: string) => {
  if (quality === "excellent") return "text-primary"
  if (quality === "good") return "text-chart-2"
  if (quality === "fair") return "text-chart-4"
  return "text-destructive"
}

const getQualityLabel = (quality: string) => {
  const labels: Record<string, string> = {
    excellent: "Excellent",
    good: "Bon",
    fair: "Moyen",
    poor: "Mauvais",
  }
  return labels[quality] || quality
}

const getQualityPercentage = (quality: string) => {
  const percentages: Record<string, number> = {
    excellent: 95,
    good: 80,
    fair: 60,
    poor: 40,
  }
  return percentages[quality] || 50
}

export function SleepHistory() {
  const [sleepRecords, setSleepRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadSleepRecords()
  }, [])

  const loadSleepRecords = async () => {
    const result = await getSleepRecords()
    if (result.data) {
      setSleepRecords(result.data.slice(0, 7))
    }
    setLoading(false)
  }

  const handleDelete = async (recordId: string) => {
    const result = await deleteSleepRecord(recordId)

    if (result.error) {
      toast({
        title: "Erreur",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Succès",
        description: "Enregistrement supprimé",
      })
      loadSleepRecords()
    }
  }

  const getRelativeDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const diffDays = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Aujourd'hui"
    if (diffDays === 1) return "Hier"
    return `Il y a ${diffDays} jours`
  }

  if (loading) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-5">Historique du sommeil</h2>
        <p className="text-sm text-muted-foreground text-center py-8">Chargement...</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-5">Historique du sommeil</h2>

      {sleepRecords.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">Aucune donnée de sommeil enregistrée</p>
      ) : (
        <div className="space-y-3">
          {sleepRecords.map((record, index) => {
            const bedtime = new Date(record.bedtime).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })
            const wakeup = new Date(record.wake_time).toLocaleTimeString("fr-FR", {
              hour: "2-digit",
              minute: "2-digit",
            })
            const duration = `${Math.floor(record.duration_hours)}h ${Math.round((record.duration_hours % 1) * 60)}m`
            const qualityPercentage = getQualityPercentage(record.quality)

            // Calculate trend
            let trend = "same"
            if (index < sleepRecords.length - 1) {
              const prevQuality = getQualityPercentage(sleepRecords[index + 1].quality)
              if (qualityPercentage > prevQuality) trend = "up"
              if (qualityPercentage < prevQuality) trend = "down"
            }

            return (
              <div
                key={record.id}
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="p-3 rounded-lg bg-chart-3/10 flex-shrink-0">
                  <Moon className="w-5 h-5 text-chart-3" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{getRelativeDate(record.sleep_date)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {bedtime} - {wakeup}
                      </p>
                    </div>
                    <div className="text-right flex items-center gap-2">
                      <div>
                        <p className="text-sm font-bold text-foreground">{duration}</p>
                        <p className={`text-xs font-medium ${getQualityColor(record.quality)}`}>
                          {getQualityLabel(record.quality)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() => handleDelete(record.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${getQualityColor(record.quality).replace("text-", "bg-")}`}
                          style={{ width: `${qualityPercentage}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{qualityPercentage}%</span>
                    {trend === "up" && <TrendingUp className="w-4 h-4 text-primary" />}
                    {trend === "down" && <TrendingDown className="w-4 h-4 text-chart-4" />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
