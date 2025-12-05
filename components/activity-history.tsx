"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, Bike, Waves, ActivityIcon, PersonStanding, Trash2 } from "lucide-react"
import { deleteActivity } from "@/lib/actions/activities"
import { useState } from "react"

const activityIcons: Record<string, any> = {
  running: Dumbbell,
  walking: PersonStanding,
  cycling: Bike,
  swimming: Waves,
  gym: Dumbbell,
  yoga: ActivityIcon,
  other: ActivityIcon,
}

const activityLabels: Record<string, string> = {
  running: "Course à pied",
  walking: "Marche",
  cycling: "Vélo",
  swimming: "Natation",
  gym: "Musculation",
  yoga: "Yoga",
  other: "Autre",
}

interface Activity {
  id: string
  activity_type: string
  duration_minutes: number
  distance_km?: number
  calories_burned?: number
  steps?: number
  activity_date: string
  created_at: string
}

interface ActivityHistoryProps {
  activities: Activity[]
}

export function ActivityHistory({ activities }: ActivityHistoryProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette activité ?")) return

    setDeletingId(id)
    try {
      await deleteActivity(id)
    } catch (error) {
      console.error("Error deleting activity:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Hier"
    } else {
      const daysAgo = Math.floor((today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
      return `Il y a ${daysAgo} jour${daysAgo > 1 ? "s" : ""}`
    }
  }

  if (activities.length === 0) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-5">Historique des activités</h2>
        <p className="text-center text-muted-foreground py-8">
          Aucune activité enregistrée. Commencez à ajouter vos exercices !
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-5">Historique des activités</h2>

      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.activity_type] || ActivityIcon
          const colorClass = `text-chart-${(index % 4) + 1}`
          const bgColorClass = `bg-chart-${(index % 4) + 1}/10`

          return (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg hover:bg-accent/50 transition-colors group"
            >
              <div className={`p-3 rounded-lg ${bgColorClass} flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${colorClass}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {activityLabels[activity.activity_type] || activity.activity_type}
                    </h3>
                    <p className="text-sm text-muted-foreground">{formatDate(activity.activity_date)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {activity.calories_burned && (
                      <span className="text-sm font-bold text-foreground">{activity.calories_burned} cal</span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(activity.id)}
                      disabled={deletingId === activity.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{activity.duration_minutes} min</span>
                  {activity.distance_km && (
                    <>
                      <span>•</span>
                      <span>{activity.distance_km} km</span>
                    </>
                  )}
                  {activity.steps && activity.steps > 0 && (
                    <>
                      <span>•</span>
                      <span>{activity.steps.toLocaleString()} pas</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
