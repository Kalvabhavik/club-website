import Link from "next/link"

import { LoginForm } from "@/components/auth/login-form"
import { SignOutButton } from "@/components/auth/sign-out-button"
import { NavigationMenuDemo } from "@/components/navigation"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getSession } from "@/lib/session"
import TargetCursorWrapper from "@/components/TargetCursorWrapper"

export const metadata = {
  title: "Member Login | OS Code IIIT Dharwad",
  description: "Sign in as an OS Code member to add and edit club events.",
  icons: {
    icon: "/oscode.ico",
  },
}

export default async function Page() {
  const session = await getSession()

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full">
          <NavigationMenuDemo />
        </div>
        <TargetCursorWrapper />

        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
            OS Members
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sign in to manage events
          </h1>
        </div>

        {session ? (
          <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-3xl border border-emerald-300/25 bg-emerald-300/5 p-8 text-center">
            <p className="text-sm text-emerald-100">
              Signed in as {session.name} ({session.username}).
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/events"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-9 rounded-full bg-cyan-300 px-4 text-slate-900 hover:bg-cyan-200"
                )}
              >
                Manage events
              </Link>
              <SignOutButton />
            </div>
          </div>
        ) : (
          <LoginForm />
        )}
      </main>
    </div>
  )
}
