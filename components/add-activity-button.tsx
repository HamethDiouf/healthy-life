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
import { Textarea } from "@/components/ui/textarea"
import { Plus } from "lucide-react"
import { addActivity } from "@/lib/actions/activities"

export function AddActivityButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    activity_type: "",
    duration_minutes: "",
    distance_km: "",
    calories_burned: "",
    steps: "",
    notes: "",
    activity_date: new Date().toISOString().split("T")[0],
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await addActivity({
        activity_type: formData.activity_type,
        duration_minutes: Number(formData.duration_minutes),
        distance_km: formData.distance_km ? Number(formData.distance_km) : undefined,
        calories_burned: formData.calories_burned ? Number(formData.calories_burned) : undefined,
        steps: formData.steps ? Number(formData.steps) : undefined,
        notes: formData.notes || undefined,
        activity_date: formData.activity_date,
      })

      if (result.error) {
        setError(result.error)
      } else {
        setOpen(false)
        setFormData({
          activity_type: "",
          duration_minutes: "",
          distance_km: "",
          calories_burned: "",
          steps: "",
          notes: "",
          activity_date: new Date().toISOString().split("T")[0],
        })
      }
    } catch (err) {
      setError("Une erreur s'est produite")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Ajouter une activité
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle activité</DialogTitle>
          <DialogDescription>Enregistrez votre séance d'exercice</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="activity_type">Type d'activité</Label>
            <Select
              value={formData.activity_type}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, activity_type: value }))}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="running">Course à pied</SelectItem>
                <SelectItem value="walking">Marche</SelectItem>
                <SelectItem value="cycling">Vélo</SelectItem>
                <SelectItem value="swimming">Natation</SelectItem>
                <SelectItem value="gym">Musculation</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
                <SelectItem value="other">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity_date">Date</Label>
            <Input
              id="activity_date"
              type="date"
              value={formData.activity_date}
              onChange={(e) => setFormData((prev) => ({ ...prev, activity_date: e.target.value }))}
              required
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Durée (min)</Label>
              <Input
                id="duration_minutes"
                type="number"
                placeholder="45"
                value={formData.duration_minutes}
                onChange={(e) => setFormData((prev) => ({ ...prev, duration_minutes: e.target.value }))}
                required
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance_km">Distance (km)</Label>
              <Input
                id="distance_km"
                type="number"
                step="0.1"
                placeholder="5.0"
                value={formData.distance_km}
                onChange={(e) => setFormData((prev) => ({ ...prev, distance_km: e.target.value }))}
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories_burned">Calories</Label>
              <Input
                id="calories_burned"
                type="number"
                placeholder="500"
                value={formData.calories_burned}
                onChange={(e) => setFormData((prev) => ({ ...prev, calories_burned: e.target.value }))}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="steps">Pas</Label>
              <Input
                id="steps"
                type="number"
                placeholder="8000"
                value={formData.steps}
                onChange={(e) => setFormData((prev) => ({ ...prev, steps: e.target.value }))}
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optionnel)</Label>
            <Textarea
              id="notes"
              placeholder="Ajoutez des notes sur votre séance..."
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              disabled={loading}
            />
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
