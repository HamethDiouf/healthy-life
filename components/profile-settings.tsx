"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Lock, Globe, LogOut } from "lucide-react"
import { signOut } from "@/lib/actions/auth"
import { useState } from "react"

const settings = [
  { label: "Notifications", icon: Bell },
  { label: "Confidentialité", icon: Lock },
  { label: "Langue", icon: Globe },
]

export function ProfileSettings() {
  const [loading, setLoading] = useState(false)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-bold text-foreground mb-4">Paramètres</h2>

      <div className="space-y-2">
        {settings.map((setting, index) => (
          <Button key={index} variant="ghost" className="w-full justify-start gap-3">
            <setting.icon className="w-4 h-4" />
            {setting.label}
          </Button>
        ))}
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleSignOut}
          disabled={loading}
        >
          <LogOut className="w-4 h-4" />
          {loading ? "Déconnexion..." : "Déconnexion"}
        </Button>
      </div>
    </Card>
  )
}
