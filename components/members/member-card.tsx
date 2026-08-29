import { ArrowUpRight } from "lucide-react"

import { MemberAvatar } from "@/components/members/member-avatar"
import { MemberRoleBadge } from "@/components/members/member-role-badge"
import type { ClubMember } from "@/lib/members"

export function MemberCard({ member }: { member: ClubMember }) {
  return (
    <article className="flex min-w-0 flex-col gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-sm transition-colors hover:border-cyan-300/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <MemberAvatar name={member.name} seed={member.username} className="size-11 text-sm" />
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-white">
              {member.name}
            </h3>
            <p className="truncate text-xs text-slate-400">
              @{member.username} · Batch {member.year}
            </p>
          </div>
        </div>
        {member.github ? (
          <a
            href={`https://github.com/${member.github}`}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on GitHub`}
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-slate-300 transition-colors hover:border-cyan-300/40 hover:text-white"
          >
            <ArrowUpRight className="size-4" />
          </a>
        ) : null}
      </div>

      <MemberRoleBadge role={member.role} />

      <p className="line-clamp-2 text-sm text-slate-300">{member.bio}</p>

      <div className="mt-auto flex flex-wrap gap-2">
        {member.domains.map((domain) => (
          <span
            key={domain}
            className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-300"
          >
            {domain}
          </span>
        ))}
      </div>
    </article>
  )
}
