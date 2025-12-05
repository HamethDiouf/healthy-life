"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Edit2 } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { updateProfile } from "@/lib/actions/profile"

interface ProfileHeaderProps {
  profile: {
    display_name: string
    email: string
    birth_date?: string
    height?: number
    weight?: number
    gender?: string
  }
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    display_name: profile.display_name,
    birth_date: profile.birth_date || "",
    height: profile.height || 0,
    weight: profile.weight || 0,
    gender: profile.gender || "",
  })

  useEffect(() => {
    setFormData({
      display_name: profile.display_name,
      birth_date: profile.birth_date || "",
      height: profile.height || 0,
      weight: profile.weight || 0,
      gender: profile.gender || "",
    })
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await updateProfile(formData)
      if (result.error) {
        setError(result.error)
      } else {
        setOpen(false)
      }
    } catch (err) {
      setError("Une erreur s'est produite")
    } finally {
      setLoading(false)
    }
  }

  const initials = profile.display_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </Link>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Edit2 className="w-4 h-4" />
                Modifier le profil
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Modifier le profil</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">{error}</div>}

                <div className="space-y-2">
                  <Label htmlFor="display_name">Nom complet</Label>
                  <Input
                    id="display_name"
                    value={formData.display_name}
                    onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="birth_date">Date de naissance</Label>
                  <Input
                    id="birth_date"
                    type="date"
                    value={formData.birth_date}
                    onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })}
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Taille (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.height || ""}
                      onChange={(e) => setFormData({ ...formData, height: Number(e.target.value) })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Poids (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={formData.weight || ""}
                      onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Genre</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez votre genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Homme</SelectItem>
                      <SelectItem value="female">Femme</SelectItem>
                      <SelectItem value="other">Autre</SelectItem>
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
        </div>
      </div>

      {/* Profile Info */}
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground text-3xl font-bold">
            {initials}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">{profile.display_name}</h1>
            <p className="text-muted-foreground mb-4">{profile.email}</p>
            <div className="flex items-center gap-6 text-sm">
              {profile.height && (
                <div>
                  <span className="font-bold text-foreground">{profile.height}</span>
                  <span className="text-muted-foreground ml-1">cm</span>
                </div>
              )}
              {profile.weight && (
                <div>
                  <span className="font-bold text-foreground">{profile.weight}</span>
                  <span className="text-muted-foreground ml-1">kg</span>
                </div>
              )}
              {profile.gender && (
                <div>
                  <span className="font-bold text-foreground capitalize">
                    {profile.gender === "male" ? "Homme" : profile.gender === "female" ? "Femme" : "Autre"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
