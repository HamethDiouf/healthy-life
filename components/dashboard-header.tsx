"use client"

import { Button } from "@/components/ui/button"
import { Bell, Settings, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { signOut } from "@/lib/actions/auth"
import { useState } from "react"

export function DashboardHeader() {
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
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-primary-foreground"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-foreground">HealthyLife</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              Tableau de bord
            </a>
            <a
              href="/activity"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Activités
            </a>
            <a
              href="/nutrition"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Nutrition
            </a>
            <a
              href="/sleep"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Sommeil
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/reminders">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    Mon profil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/reminders" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="w-4 h-4" />
                    Paramètres
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  disabled={loading}
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  {loading ? "Déconnexion..." : "Se déconnecter"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
