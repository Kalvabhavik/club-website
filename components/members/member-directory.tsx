
"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import ChromaGrid from "@/components/ChromaGrid"
import { MemberRoleBadge } from "@/components/members/member-role-badge"
import { memberDomains } from "@/lib/members"
import type { ClubMember } from "@/lib/members"

type Member = ClubMember & {
  id?: string
  avatar?: string
  handle?: string
}

type MemberDirectoryProps = {
  members: Member[]
}

export function MemberDirectory({ members }: MemberDirectoryProps) {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filters = useMemo(() => {
    const roles = members
      .map((member) => member.role)
      .filter((role) => role !== "Lead" && role !== "Co-lead")

    return ["All", ...Array.from(new Set(roles))]
  }, [members])

  const filteredMembers = useMemo(() => {
    const searchValue = search.toLowerCase().trim()

    return members.filter((member) => {
      const isLeadership = member.role === "Lead" || member.role === "Co-lead"
      const name = member.name?.toLowerCase() ?? ""
      const role = member.role?.toLowerCase() ?? ""
      const handle = member.handle?.toLowerCase() ?? ""

      const matchesSearch =
        !searchValue ||
        name.includes(searchValue) ||
        role.includes(searchValue) ||
        handle.includes(searchValue)

      const matchesFilter =
        filter === "All" || member.role === filter

      return !isLeadership && matchesSearch && matchesFilter
    })
  }, [members, search, filter])

  const leadership = members.filter(
    (member) => member.role === "Lead" || member.role === "Co-lead"
  )

  const getChromaItem = (member: Member) => {
    const borderColor =
      member.role === "Lead"
        ? "#06B6D4"
        : member.role === "Domain Lead"
          ? "#F59E0B"
          : "#10B981"

    return {
      image:
        member.image ||
        member.avatar ||
        "/members/rd.webp",

      title: member.name,

      subtitle: member.role +" #"+ member.year,

      handle:
        member.handle ||
        (typeof member.github === "string"
          ? `@${member.github.split("/").pop()}`
          : "@member"),

      borderColor,

      gradient: `linear-gradient(145deg, ${borderColor}, #000)`,

      url:
        member.github ||
        member.linkedin ||
        "#",
    }
  }

  const domainSections = memberDomains
    .map((domain) => ({
      domain,
      members: filteredMembers.filter((member) => member.domains.includes(domain)),
    }))
    .filter((section) => section.members.length > 0)

  return (
    <section className="w-full">
      <div className="mb-12 border-b border-white/10 pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
              The people behind the projects
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Meet the team.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              A student-led community building in public, learning together and
              making open source feel a little more human.
            </p>
          </div>

          <div className="text-sm text-slate-400">
            {filteredMembers.length}{" "}
            {filteredMembers.length === 1 ? "member" : "members"}
          </div>
        </div>
      </div>

      {leadership.length > 0 && filter === "All" && !search && (
        <div className="mb-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
                Leadership
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Direction, with room to build.
              </h2>
            </div>
            <span className="hidden text-right text-xs leading-relaxed text-slate-500 sm:block">
              The two people keeping<br />the club moving forward.
            </span>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {leadership.map((member) => (
              <article
                key={member.username}
                className="group relative min-h-[40rem] overflow-hidden rounded-[1.75rem] border border-white/15 bg-slate-950 shadow-2xl shadow-cyan-950/20"
              >
                <Image
                  fill
                  src={member.image || "/members/rd.webp"}
                  alt={`Portrait of ${member.name}`}
                  sizes="(min-width: 768px) 100vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover object-top grayscale-[20%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />
                <div className="relative flex min-h-[40rem] flex-col justify-end p-6 sm:p-8">
                  <MemberRoleBadge role={member.role} className="mb-3" />
                  <h3 className="text-3xl font-semibold tracking-tight text-white">
                    {member.name}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-200">
                    {member.bio}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {member.domains.map((domain) => (
                      <span
                        key={domain}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
                      >
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search members..."
            className="h-11 w-full rounded-xl border border-white/10 bg-background/60 px-4 text-sm outline-none backdrop-blur-xl transition placeholder:text-muted-foreground focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>

        <select
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          className="h-11 rounded-xl border border-white/10 bg-background/60 px-4 text-sm outline-none backdrop-blur-xl transition focus:border-cyan-400/50"
        >
          {filters.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {domainSections.length > 0 ? (
        <div className="space-y-14">
          {domainSections.map(({ domain, members: domainMembers }) => (
            <section key={domain} aria-labelledby={`${domain}-members`}>
              <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
                    Domain
                  </p>
                  <h2
                    id={`${domain}-members`}
                    className="mt-1 text-2xl font-semibold tracking-tight text-white"
                  >
                    {domain}
                  </h2>
                </div>
                <span className="text-sm text-slate-500">
                  {domainMembers.length} {domainMembers.length === 1 ? "member" : "members"}
                </span>
              </div>
              <div
                className="relative w-full"
                style={{
                  minHeight: "400px",
                  maxHeight: "1500px",
                }}
              >
                <ChromaGrid
                  items={domainMembers.map(getChromaItem)}
                  radius={300}
                  damping={0.45}
                  fadeOut={0.6}
                  ease="power3.out"
                />
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="text-center">
            <p className="text-lg font-medium">No members found</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Try changing your search or filter.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}

