import { Card } from "@/components/ui/card"
import { Award, Trophy, Star, Zap } from "lucide-react"

const achievements = [
  {
    title: "Premier pas",
    description: "Complétez votre première journée",
    icon: Star,
    earned: true,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    title: "Marathonien",
    description: "Marchez 10,000 pas en une journée",
    icon: Trophy,
    earned: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Semaine parfaite",
    description: "Atteignez vos objectifs 7 jours de suite",
    icon: Award,
    earned: true,
    color: "text-chart-2",
    bgColor: "bg-chart-2/10",
  },
  {
    title: "Super énergie",
    description: "Brûlez 1000 calories en une journée",
    icon: Zap,
    earned: false,
    color: "text-muted-foreground",
    bgColor: "bg-muted",
  },
]

export function ProfileAchievements() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-foreground mb-5">Badges et réalisations</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${achievement.bgColor} ${achievement.earned ? "" : "opacity-50"}`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-card`}>
                <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground mb-0.5">{achievement.title}</h3>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
