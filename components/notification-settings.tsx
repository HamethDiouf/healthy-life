"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

const settingsList = [
  {
    id: "push",
    label: "Notifications push",
    description: "Recevoir des alertes sur votre appareil",
  },
  {
    id: "email",
    label: "Notifications email",
    description: "Recevoir des résumés par email",
  },
  {
    id: "sound",
    label: "Sons",
    description: "Jouer un son lors des notifications",
  },
  {
    id: "vibration",
    label: "Vibrations",
    description: "Faire vibrer lors des alertes",
  },
  {
    id: "dnd",
    label: "Ne pas déranger",
    description: "Désactiver les notifications la nuit",
  },
]

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    push: true,
    email: false,
    sound: true,
    vibration: true,
    dnd: true,
  })

  const toggleSetting = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev],
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-5">Paramètres</h2>

        <div className="space-y-4">
          {settingsList.map((setting) => (
            <div key={setting.id} className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <Label htmlFor={setting.id} className="text-sm font-medium text-foreground cursor-pointer">
                  {setting.label}
                </Label>
                <p className="text-xs text-muted-foreground mt-0.5">{setting.description}</p>
              </div>
              <Switch
                id={setting.id}
                checked={settings[setting.id as keyof typeof settings]}
                onCheckedChange={() => toggleSetting(setting.id)}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Heures silencieuses</h2>

        <div className="space-y-4">
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Début</Label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground"
            />
          </div>
          <div>
            <Label className="text-sm text-muted-foreground mb-2 block">Fin</Label>
            <input
              type="time"
              defaultValue="07:00"
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-foreground"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Statistiques</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Rappels cette semaine</span>
            <span className="text-sm font-bold text-foreground">156</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Taux de complétion</span>
            <span className="text-sm font-bold text-primary">87%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Rappels reportés</span>
            <span className="text-sm font-bold text-foreground">12</span>
          </div>
        </div>
      </Card>
    </div>
  )
}
