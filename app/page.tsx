import { DashboardHeader } from "@/components/dashboard-header"
import { StatsOverview } from "@/components/stats-overview"
import { ActivityChart } from "@/components/activity-chart"
import { QuickActions } from "@/components/quick-actions"
import { DailyGoals } from "@/components/daily-goals"
import { RecentActivity } from "@/components/recent-activity"
import { getUser } from "@/lib/actions/auth"
import { getProfile } from "@/lib/actions/profile"
import { redirect } from "next/navigation"

export default async function Home() {
  const user = await getUser()
  if (!user) {
    redirect("/login")
  }

  const profile = await getProfile()
  const firstName = profile?.display_name?.split(" ")[0] || "Utilisateur"

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-7xl">
        {/* Hero Section */}
        <section className="mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-3 text-foreground">Bonjour, {firstName}</h1>
          <p className="text-lg text-muted-foreground text-balance">Continuez votre parcours vers une vie plus saine</p>
        </section>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            <ActivityChart />
            <RecentActivity />
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            <DailyGoals />
            <QuickActions />
          </div>
        </div>
      </main>
    </div>
  )
}
