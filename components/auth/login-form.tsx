"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, KeyRound } from "lucide-react"

import { Button } from "@/components/ui/button"

const inputClass =
  "h-11 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-slate-400 focus-visible:border-cyan-300/60 focus-visible:outline-none"

export function LoginForm() {
  const router = useRouter()

  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  async function handleSignIn(formEvent: React.FormEvent) {
    formEvent.preventDefault()
    setPending(true)

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    })

    setPending(false)

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string
      } | null
      setError(data?.error ?? "Could not sign in. Try again.")
      return
    }

    setError(null)
    setPassword("")
    router.push("/events")
    router.refresh()
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-3xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm sm:p-8">
      <div className="space-y-1 text-center">
        <KeyRound className="mx-auto size-7 text-cyan-300" />
        <h2 className="text-xl font-semibold text-white">Member sign in</h2>
        <p className="text-sm text-slate-300">
          Only OS Code members can add or edit events.
        </p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-3">
        <label className="block space-y-2">
          <span className="text-sm text-slate-300">Username</span>
          <input
            value={username}
            onChange={(inputEvent) => setUsername(inputEvent.target.value)}
            autoComplete="username"
            className={inputClass}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-sm text-slate-300">Password</span>
          <input
            type="password"
            value={password}
            onChange={(inputEvent) => setPassword(inputEvent.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            className={inputClass}
          />
        </label>
        <Button
          type="submit"
          size="lg"
          disabled={pending}
          className="h-10 w-full rounded-full bg-cyan-300 text-slate-900 hover:bg-cyan-200"
        >
          {pending ? "Signing in..." : "Sign in"}
          <ArrowRight className="size-4" />
        </Button>
      </form>

      {error ? (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      ) : null}
    </div>
  )
}
