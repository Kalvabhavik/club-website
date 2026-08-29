import { cn } from "@/lib/utils"
import type { MemberRole } from "@/lib/members"

const styles: Record<MemberRole, { dot: string; text: string }> = {
  Lead: { dot: "bg-cyan-300", text: "text-cyan-200" },
  "Core Team": { dot: "bg-emerald-400", text: "text-emerald-200" },
  Contributor: { dot: "bg-sky-400", text: "text-sky-200" },
  Alumni: { dot: "bg-slate-400", text: "text-slate-300" },
}

export function MemberRoleBadge({
  role,
  className,
}: {
  role: MemberRole
  className?: string
}) {
  const style = styles[role]

  return (
    <span
      className={cn(
        "flex items-center gap-2 text-xs font-medium",
        style.text,
        className
      )}
    >
      <span className={cn("size-2 rounded-full", style.dot)} />
      {role}
    </span>
  )
}
