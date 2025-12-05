import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Inscription réussie !</CardTitle>
            <CardDescription>Vérifiez votre email</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Merci de vous être inscrit à HealthyLife ! Veuillez vérifier votre email pour confirmer votre compte avant
              de vous connecter.
            </p>
            <Button asChild className="w-full">
              <Link href="/login">Retour à la connexion</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
