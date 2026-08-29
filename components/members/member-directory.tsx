"use client"

import * as React from "react"
import { Search, Users } from "lucide-react"

import { MemberCard } from "@/components/members/member-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  getMemberStats,
  memberDomains,
  memberRoles,
  type ClubMember,
} from "@/lib/members"

export function MemberDirectory({ members }: { members: ClubMember[] }) {
  const [query, setQuery] = React.useState("")
  const [role, setRole] = React.useState<string>("All")
  const [domain, setDomain] = React.useState<string>("All")

  const stats = React.useMemo(() => getMemberStats(members), [members])

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    return members.filter((member) => {
      const matchesQuery =
        needle.length === 0 ||
        member.name.toLowerCase().includes(needle) ||
        member.username.toLowerCase().includes(needle) ||
        member.bio.toLowerCase().includes(needle)
      const matchesRole = role === "All" || member.role === role
      const matchesDomain = domain === "All" || member.domains.includes(domain as never)
      return matchesQuery && matchesRole && matchesDomain
    })
  }, [members, query, role, domain])

  return (
    <section className="w-full space-y-10">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
          Members
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          The people behind OS Code
        </h2>
        <p className="mx-auto max-w-xl text-sm text-slate-300 sm:text-base">
          Leads, core team, contributors and alumni who build, mentor and ship
          together.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 backdrop-blur-sm">
          <p className="text-3xl font-semibold tracking-tight text-white">
            {stats.total}+
          </p>
          <p className="mt-1 text-sm text-slate-300">Total Members</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 backdrop-blur-sm">
          <p className="text-3xl font-semibold tracking-tight text-white">
            {stats.core}
          </p>
          <p className="mt-1 text-sm text-slate-300">Leads &amp; Core Team</p>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 backdrop-blur-sm">
          <p className="text-3xl font-semibold tracking-tight text-white">
            {stats.domains}
          </p>
          <p className="mt-1 text-sm text-slate-300">Active Domains</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="relative block">
          <span className="sr-only">Search members</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search members..."
            className="h-11 w-full rounded-full border border-white/15 bg-white/5 pr-4 pl-11 text-sm text-white placeholder:text-slate-400 focus-visible:border-cyan-300/60 focus-visible:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {["All", ...memberRoles].map((option) => (
            <Button
              key={option}
              size="lg"
              variant={role === option ? "default" : "outline"}
              aria-pressed={role === option}
              onClick={() => setRole(option)}
              className={cn(
                "h-9 rounded-full px-4",
                role === option
                  ? "bg-cyan-300 text-slate-900 hover:bg-cyan-200"
                  : "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              )}
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", ...memberDomains].map((option) => (
            <Button
              key={option}
              size="sm"
              variant={domain === option ? "default" : "outline"}
              aria-pressed={domain === option}
              onClick={() => setDomain(option)}
              className={cn(
                "h-7 rounded-full px-3 text-xs",
                domain === option
                  ? "bg-emerald-300 text-slate-900 hover:bg-emerald-200"
                  : "border-white/20 bg-transparent text-slate-300 hover:bg-white/10 hover:text-white"
              )}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((member) => (
            <MemberCard key={member.username} member={member} />
          ))}
        </div>
      ) : (
        <p className="flex flex-col items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-12 text-center text-sm text-slate-300">
          <Users className="size-5 text-slate-400" />
          No members match these filters.
        </p>
      )}
    </section>
  )
}
