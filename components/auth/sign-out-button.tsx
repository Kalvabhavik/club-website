"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter()

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.refresh()
  }

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={handleSignOut}
      className={cn(
        "h-9 rounded-full border-white/25 bg-transparent px-4 text-white hover:bg-white/10 hover:text-white",
        className
      )}
    >
      <LogOut className="size-4" />
      Sign out
    </Button>
  )
}
