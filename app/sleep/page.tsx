import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { SleepHeader } from "@/components/sleep-header"
import { SleepOverview } from "@/components/sleep-overview"
import { SleepChart } from "@/components/sleep-chart"
import { SleepQuality } from "@/components/sleep-quality"
import { SleepHistory } from "@/components/sleep-history"
import { AddSleepButton } from "@/components/add-sleep-button"

export default async function SleepPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <SleepHeader />

      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Suivi du sommeil</h1>
            <p className="text-muted-foreground">Analysez la qualité de votre repos</p>
          </div>
          <AddSleepButton />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SleepOverview />
            <SleepChart />
            <SleepHistory />
          </div>
          <div>
            <SleepQuality />
          </div>
        </div>
      </main>
    </div>
  )
}
