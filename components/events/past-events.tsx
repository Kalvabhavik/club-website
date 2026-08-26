"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Search, Sparkles } from "lucide-react"

import { EventCard } from "@/components/events/event-card"
import { EventCover } from "@/components/events/event-cover"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  eventCategories,
  formatEventDate,
  getEventYears,
  type ClubEvent,
  type PastEventStats,
} from "@/lib/events"

const PAGE_SIZE = 6

export function PastEvents({
  events,
  featured,
  stats,
  onEdit,
}: {
  events: ClubEvent[]
  featured?: ClubEvent
  stats: PastEventStats
  onEdit?: (event: ClubEvent) => void
}) {
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<string>("All")
  const [year, setYear] = React.useState<string>("All")
  const [visible, setVisible] = React.useState(PAGE_SIZE)

  const years = React.useMemo(() => getEventYears(events), [events])

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    return events.filter((event) => {
      const matchesQuery =
        needle.length === 0 ||
        event.title.toLowerCase().includes(needle) ||
        event.summary.toLowerCase().includes(needle) ||
        event.tags.some((tag) => tag.toLowerCase().includes(needle))
      const matchesCategory = category === "All" || event.category === category
      const matchesYear = year === "All" || event.date.startsWith(year)
      return matchesQuery && matchesCategory && matchesYear
    })
  }, [events, query, category, year])

  const shown = filtered.slice(0, visible)

  const statCards = [
    { label: "Events hosted", value: `${stats.eventsHosted}` },
    { label: "People reached", value: stats.peopleReached },
    { label: "Resources published", value: `${stats.resourcesPublished}` },
  ]

  return (
    <section className="w-full space-y-10">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
          Past Events
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Relive our club&apos;s journey
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {statCards.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 text-center backdrop-blur-sm"
          >
            <p className="text-3xl font-semibold tracking-tight text-white">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-slate-300">{item.label}</p>
          </div>
        ))}
      </div>

      {featured ? (
        <div className="space-y-3">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.18em] text-amber-200 uppercase">
            <Sparkles className="size-4" />
            Featured Event
          </p>
          <div className="relative overflow-hidden rounded-3xl border border-white/15">
            <div className="absolute inset-0">
              <EventCover
                src={featured.gallery[0]}
                alt={featured.title}
                seed={featured.slug}
              />
            </div>
            <div className="relative flex flex-col items-center gap-3 bg-slate-950/60 px-6 py-14 text-center backdrop-blur-[2px] sm:py-20">
              <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
                {featured.category}
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {featured.title}
              </h3>
              <p className="text-sm text-slate-300">
                {formatEventDate(featured.date)}
              </p>
              <Link
                href={`/events/${featured.slug}`}
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "mt-2 h-10 rounded-full bg-cyan-300 px-5 text-slate-900 hover:bg-cyan-200"
                )}
              >
                View Event
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        <label className="relative block">
          <span className="sr-only">Search events</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setVisible(PAGE_SIZE)
            }}
            placeholder="Search events..."
            className="h-11 w-full rounded-full border border-white/15 bg-white/5 pr-4 pl-11 text-sm text-white placeholder:text-slate-400 focus-visible:border-cyan-300/60 focus-visible:outline-none"
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {["All", ...eventCategories].map((option) => (
              <Button
                key={option}
                size="lg"
                variant={category === option ? "default" : "outline"}
                aria-pressed={category === option}
                onClick={() => {
                  setCategory(option)
                  setVisible(PAGE_SIZE)
                }}
                className={cn(
                  "h-9 rounded-full px-4",
                  category === option
                    ? "bg-cyan-300 text-slate-900 hover:bg-cyan-200"
                    : "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                )}
              >
                {option}
              </Button>
            ))}
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-300">
            Year:
            <select
              value={year}
              onChange={(event) => {
                setYear(event.target.value)
                setVisible(PAGE_SIZE)
              }}
              className="h-9 rounded-full border border-white/25 bg-slate-950 px-3 text-sm text-white focus-visible:border-cyan-300/60 focus-visible:outline-none"
            >
              <option value="All">All</option>
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {shown.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((event) => (
            <EventCard key={event.slug} event={event} onEdit={onEdit} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-white/15 bg-white/5 px-6 py-12 text-center text-sm text-slate-300">
          No past events match these filters yet.
        </p>
      )}

      {visible < filtered.length ? (
        <div className="flex justify-center">
          <Button
            size="lg"
            variant="outline"
            onClick={() => setVisible((count) => count + PAGE_SIZE)}
            className="h-10 rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
          >
            Load More
          </Button>
        </div>
      ) : null}
    </section>
  )
}
