import { ActivityHeader } from "@/components/activity-header"
import { ActivityOverview } from "@/components/activity-overview"
import { ActivityHistory } from "@/components/activity-history"
import { ActivityGoals } from "@/components/activity-goals"
import { AddActivityButton } from "@/components/add-activity-button"
import { getUser } from "@/lib/actions/auth"
import { getActivities } from "@/lib/actions/activities"
import { redirect } from "next/navigation"

export default async function ActivityPage() {
  const user = await getUser()
  if (!user) {
    redirect("/login")
  }

  const activities = await getActivities(50)

  return (
    <div className="min-h-screen bg-background">
      <ActivityHeader />

      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Activité physique</h1>
            <p className="text-muted-foreground">Suivez vos exercices et progressez vers vos objectifs</p>
          </div>
          <AddActivityButton />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ActivityOverview />
            <ActivityHistory activities={activities} />
          </div>
          <div>
            <ActivityGoals />
          </div>
        </div>
      </main>
    </div>
  )
}
