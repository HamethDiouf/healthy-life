import { ProfileHeader } from "@/components/profile-header"
import { ProfileStats } from "@/components/profile-stats"
import { ProfileSettings } from "@/components/profile-settings"
import { ProfileGoals } from "@/components/profile-goals"
import { ProfileAchievements } from "@/components/profile-achievements"
import { getProfile } from "@/lib/actions/profile"
import { getUser } from "@/lib/actions/auth"
import { redirect } from "next/navigation"

export default async function ProfilePage() {
  const user = await getUser()
  if (!user) {
    redirect("/login")
  }

  const profile = await getProfile()
  if (!profile) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <ProfileHeader profile={profile} />

      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            <ProfileStats />
            <ProfileAchievements />
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            <ProfileGoals />
            <ProfileSettings />
          </div>
        </div>
      </main>
    </div>
  )
}
