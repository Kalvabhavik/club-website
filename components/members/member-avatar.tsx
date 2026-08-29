import { cn } from "@/lib/utils"

const gradients = [
  "from-cyan-500/40 via-slate-900 to-emerald-500/30",
  "from-emerald-500/40 via-slate-900 to-cyan-500/30",
  "from-sky-500/40 via-slate-900 to-indigo-500/30",
  "from-indigo-500/40 via-slate-900 to-cyan-500/30",
]

function gradientFor(seed: string): string {
  const index = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0)
  return gradients[index % gradients.length]
}

function initialsFor(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ""
  return `${first}${last}`.toUpperCase()
}

export function MemberAvatar({
  name,
  seed,
  className,
}: {
  name: string
  seed: string
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-linear-to-br font-semibold text-white",
        gradientFor(seed),
        className
      )}
    >
      {initialsFor(name)}
    </div>
  )
}
