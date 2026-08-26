import { cn } from "@/lib/utils"
import type { RegistrationStatus } from "@/lib/events"

const styles: Record<RegistrationStatus, { label: string; dot: string; text: string }> =
  {
    open: {
      label: "Registration open",
      dot: "bg-emerald-400",
      text: "text-emerald-200",
    },
    soon: {
      label: "Opening soon",
      dot: "bg-amber-400",
      text: "text-amber-200",
    },
    closed: {
      label: "Registration closed",
      dot: "bg-slate-400",
      text: "text-slate-300",
    },
  }

export function EventStatusBadge({
  status,
  className,
}: {
  status: RegistrationStatus
  className?: string
}) {
  const style = styles[status]

  return (
    <span
      className={cn("flex items-center gap-2 text-xs font-medium", style.text, className)}
    >
      <span className={cn("size-2 rounded-full", style.dot)} />
      {style.label}
    </span>
  )
}
