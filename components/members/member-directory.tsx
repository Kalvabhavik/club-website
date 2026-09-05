
"use client"

import { useMemo, useState } from "react"
import ChromaGrid from "@/components/ChromaGrid"

type Member = {
  id?: string
  name: string
  role?: string
  image?: string
  avatar?: string
  handle?: string
  github?: string
  linkedin?: string
  [key: string]: unknown
  year: any
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
      .filter((role): role is string => Boolean(role))

    return ["All", ...Array.from(new Set(roles))]
  }, [members])

  const filteredMembers = useMemo(() => {
    const searchValue = search.toLowerCase().trim()

    return members.filter((member) => {
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

      return matchesSearch && matchesFilter
    })
  }, [members, search, filter])

  const chromaItems = filteredMembers.map((member, index) => {
    const colors = [
      "#06B6D4",
      "#10B981",
      "#8B5CF6",
      "#3B82F6",
      "#F59E0B",
      "#EC4899",
    ]

    const borderColor = colors[index % colors.length]

    return {
      image:
        member.image ||
        member.avatar,

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
  })

  return (
    <section className="w-full">
      {/* Members Directory Header */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Members Directory
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Meet the leads, core team, contributors and alumni of OS Code.
            </p>
          </div>

          <div className="text-sm text-muted-foreground">
            {filteredMembers.length}{" "}
            {filteredMembers.length === 1 ? "member" : "members"}
          </div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search members..."
            className="h-11 w-full rounded-xl border border-white/10 bg-background/60 px-4 text-sm outline-none backdrop-blur-xl transition placeholder:text-muted-foreground focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
          />
        </div>

        {/* Filter */}
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

      {/* ChromaGrid */}
      {filteredMembers.length > 0 ? (
        <div
          className="relative w-full"
          style={{
            minHeight: "400px",
          }}
        >
          <ChromaGrid
            items={chromaItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
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

