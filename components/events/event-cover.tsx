import { ImageIcon } from "lucide-react"

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

export function EventCover({
  src,
  alt,
  seed,
  className,
}: {
  src?: string
  alt: string
  seed: string
  className?: string
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("h-full w-full object-cover", className)}
      />
    )
  }

  return (
    <div
      aria-hidden
      className={cn(
        "flex h-full w-full items-center justify-center bg-linear-to-br",
        gradientFor(seed),
        className
      )}
    >
      <ImageIcon className="size-8 text-white/40" />
    </div>
  )
}
