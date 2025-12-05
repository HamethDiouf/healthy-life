import { SignupForm } from "@/components/signup-form"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mb-4">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-10 h-10 text-primary-foreground"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Créer un compte</h1>
          <p className="text-muted-foreground mt-2 text-center">Commencez votre parcours vers une vie plus saine</p>
        </div>

        <SignupForm />

        <p className="text-center text-sm text-muted-foreground mt-6">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="text-primary hover:text-primary/80 font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}
