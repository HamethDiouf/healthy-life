"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"
import { addSleepRecord } from "@/lib/actions/sleep"
import { useToast } from "@/hooks/use-toast"

export function AddSleepButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    bedtime: "",
    wakeup: "",
    quality: "good",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const bedtimeDate = new Date(`${formData.date}T${formData.bedtime}:00`)
    const wakeupDate = new Date(`${formData.date}T${formData.wakeup}:00`)

    // If wakeup is before bedtime, add one day
    if (wakeupDate < bedtimeDate) {
      wakeupDate.setDate(wakeupDate.getDate() + 1)
    }

    const durationHours = (wakeupDate.getTime() - bedtimeDate.getTime()) / (1000 * 60 * 60)

    const result = await addSleepRecord({
      sleep_date: formData.date,
      bedtime: bedtimeDate.toISOString(),
      wake_time: wakeupDate.toISOString(),
      duration_hours: durationHours,
      quality: formData.quality as "excellent" | "good" | "fair" | "poor",
    })

    setLoading(false)

    if (result.error) {
      toast({
        title: "Erreur",
        description: result.error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Succès",
        description: "Sommeil enregistré avec succès",
      })
      setOpen(false)
      setFormData({ date: new Date().toISOString().split("T")[0], bedtime: "", wakeup: "", quality: "good" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Enregistrer le sommeil
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enregistrer une nuit</DialogTitle>
          <DialogDescription>Ajoutez les détails de votre sommeil</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedtime">Heure de coucher</Label>
              <Input
                id="bedtime"
                type="time"
                value={formData.bedtime}
                onChange={(e) => setFormData((prev) => ({ ...prev, bedtime: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wakeup">Heure de réveil</Label>
              <Input
                id="wakeup"
                type="time"
                value={formData.wakeup}
                onChange={(e) => setFormData((prev) => ({ ...prev, wakeup: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quality">Qualité du sommeil</Label>
            <Select
              value={formData.quality}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, quality: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Bon</SelectItem>
                <SelectItem value="fair">Moyen</SelectItem>
                <SelectItem value="poor">Mauvais</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
