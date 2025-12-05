import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { RemindersHeader } from "@/components/reminders-header"
import { NotificationSettings } from "@/components/notification-settings"
import { RemindersList } from "@/components/reminders-list"
import { CreateReminderButton } from "@/components/create-reminder-button"

export default async function RemindersPage() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <RemindersHeader />

      <main className="container mx-auto px-4 py-6 lg:py-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">Notifications et rappels</h1>
            <p className="text-muted-foreground">Gérez vos alertes pour rester motivé</p>
          </div>
          <CreateReminderButton />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RemindersList />
          </div>
          <div>
            <NotificationSettings />
          </div>
        </div>
      </main>
    </div>
  )
}
