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
import { addMeal } from "@/lib/actions/nutrition"
import { useToast } from "@/hooks/use-toast"

export function AddMealButton() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const result = await addMeal({
      meal_type: formData.type as "breakfast" | "lunch" | "dinner" | "snack",
      meal_name: formData.name,
      calories: Number.parseInt(formData.calories),
      proteins: formData.protein ? Number.parseFloat(formData.protein) : undefined,
      carbs: formData.carbs ? Number.parseFloat(formData.carbs) : undefined,
      fats: formData.fat ? Number.parseFloat(formData.fat) : undefined,
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
        description: "Repas ajouté avec succès",
      })
      setOpen(false)
      setFormData({ type: "", name: "", calories: "", protein: "", carbs: "", fat: "" })
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Ajouter un repas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouveau repas</DialogTitle>
          <DialogDescription>Enregistrez ce que vous avez mangé</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="type">Type de repas</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="breakfast">Petit-déjeuner</SelectItem>
                <SelectItem value="lunch">Déjeuner</SelectItem>
                <SelectItem value="dinner">Dîner</SelectItem>
                <SelectItem value="snack">Collation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nom du repas</Label>
            <Input
              id="name"
              placeholder="ex: Salade César"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input
                id="calories"
                type="number"
                placeholder="500"
                value={formData.calories}
                onChange={(e) => setFormData((prev) => ({ ...prev, calories: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="protein">Protéines (g)</Label>
              <Input
                id="protein"
                type="number"
                placeholder="25"
                value={formData.protein}
                onChange={(e) => setFormData((prev) => ({ ...prev, protein: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="carbs">Glucides (g)</Label>
              <Input
                id="carbs"
                type="number"
                placeholder="60"
                value={formData.carbs}
                onChange={(e) => setFormData((prev) => ({ ...prev, carbs: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">Lipides (g)</Label>
              <Input
                id="fat"
                type="number"
                placeholder="15"
                value={formData.fat}
                onChange={(e) => setFormData((prev) => ({ ...prev, fat: e.target.value }))}
              />
            </div>
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
