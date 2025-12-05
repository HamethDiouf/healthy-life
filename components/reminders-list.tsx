"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Droplet, Moon, Utensils, Dumbbell, Trash2, Plus } from "lucide-react"
import { getReminders, toggleReminder, deleteReminder } from "@/lib/actions/reminders"
import { useToast } from "@/hooks/use-toast"

const reminderIcons: Record<string, any> = {
  water: Droplet,
  exercise: Dumbbell,
  meal: Utensils,
  sleep: Moon,
  custom: Plus,
}

const reminderColors: Record<string, { color: string; bgColor: string }> = {
  water: { color: "text-chart-2", bgColor: "bg-chart-2/10" },
  exercise: { color: "text-primary", bgColor: "bg-primary/10" },
  meal: { color: "text-chart-4", bgColor: "bg-chart-4/10" },
  sleep: { color: "text-chart-3", bgColor: "bg-chart-3/10" },
  custom: { color: "text-chart-1", bgColor: "bg-chart-1/10" },
}

export function RemindersList() {
  const [reminders, setReminders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadReminders()
  }, [])

  const loadReminders = async () => {
    const result = await getReminders()
    if (result.data) {
      setReminders(result.data)
    }
    setLoading(false)
  }

  const handleToggle = async (reminderId: string, currentState: boolean) => {
    const result = await toggleReminder(reminderId, !currentState)

    if (result.error) {
      toast({
        title: "Erreur",
        description: result.error,
        variant: "destructive",
      })
    } else {
      loadReminders()
    }
  }

  const handleDelete = async (reminderId: string) => {
    const result = await deleteReminder(reminderId)

    if (result.error) {
      toast({
        title: "Erreur",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Succès",
        description: "Rappel supprimé",
      })
      loadReminders()
    }
  }

  if (loading) {
    return (
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-5">Rappels actifs</h2>
        <p className="text-sm text-muted-foreground text-center py-8">Chargement...</p>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-foreground">Rappels actifs</h2>
        <Badge variant="secondary">{reminders.filter((r) => r.is_enabled).length} actifs</Badge>
      </div>

      <div className="space-y-3">
        {reminders.map((reminder) => {
          const Icon = reminderIcons[reminder.reminder_type] || Plus
          const colors = reminderColors[reminder.reminder_type] || reminderColors.custom

          return (
            <div
              key={reminder.id}
              className={`p-4 rounded-lg border ${reminder.is_enabled ? "border-border bg-card" : "border-border/50 bg-muted/30 opacity-75"}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2.5 rounded-lg ${colors.bgColor} flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${colors.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <h3 className="font-semibold text-foreground">{reminder.title}</h3>
                      {reminder.description && <p className="text-sm text-muted-foreground">{reminder.description}</p>}
                    </div>
                    <Switch
                      checked={reminder.is_enabled}
                      onCheckedChange={() => handleToggle(reminder.id, reminder.is_enabled)}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <Bell className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{reminder.reminder_time.substring(0, 5)}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(reminder.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {reminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-sm text-muted-foreground">Aucun rappel configuré. Créez-en un pour rester motivé.</p>
        </div>
      )}
    </Card>
  )
}
