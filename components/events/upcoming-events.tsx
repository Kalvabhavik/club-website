"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  Clock,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react"

import { Countdown } from "@/components/events/countdown"
import { EventCard } from "@/components/events/event-card"
import { EventCover } from "@/components/events/event-cover"
import { EventStatusBadge } from "@/components/events/event-status-badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  eventCategories,
  formatEventDayMonth,
  getEventStart,
  type ClubEvent,
} from "@/lib/events"


export function UpcomingEvents({
  events,
  featured,
  onEdit,
}: {
  events: ClubEvent[]
  featured?: ClubEvent
  onEdit?: (event: ClubEvent) => void
}) {
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState<string>("All")

  const filtered = React.useMemo(() => {
    const needle = query.trim().toLowerCase()
    return events.filter((event) => {
      const matchesQuery =
        needle.length === 0 ||
        event.title.toLowerCase().includes(needle) ||
        event.summary.toLowerCase().includes(needle) ||
        event.tags.some((tag) => tag.toLowerCase().includes(needle))
      return matchesQuery && (category === "All" || event.category === category)
    })
  }, [events, query, category])

  const fillPercent =
    featured?.capacity && featured.capacity > 0
      ? Math.min(
          100,
          Math.round(((featured.registered ?? 0) / featured.capacity) * 100)
        )
      : null

  return (
    <section className="w-full space-y-10">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
          Upcoming Events
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          What&apos;s happening next?
        </h2>
      </div>

      {featured ? (
        <div className="space-y-6">
          <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.18em] text-amber-200 uppercase">
            <Sparkles className="size-4" />
            Featured Event
          </p>

          <div className="grid gap-0 overflow-hidden rounded-3xl border border-white/15 bg-white/5 backdrop-blur-sm md:grid-cols-2">
            <div className="relative min-h-56 md:min-h-full">
              <EventCover
                src={featured.gallery[0]}
                alt={featured.title}
                seed={featured.slug}
              />
            </div>

            <div className="flex min-w-0 flex-col gap-4 p-6 sm:p-8">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {featured.title}
                </h3>
                {featured.subtitle ? (
                  <p className="text-sm text-slate-300">{featured.subtitle}</p>
                ) : null}
              </div>

              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <CalendarDays className="size-4" />
                  {formatEventDayMonth(featured.date)}
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="size-4" />
                  {featured.time}
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="size-4" />
                  <span className="min-w-0 truncate">{featured.venue}</span>
                </li>
              </ul>

              {featured.registrationStatus ? (
                <EventStatusBadge status={featured.registrationStatus} />
              ) : null}

              {fillPercent !== null ? (
                <div className="space-y-1">
                  <div
                    role="progressbar"
                    aria-valuenow={fillPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${featured.title} seats filled`}
                    className="h-2 w-full overflow-hidden rounded-full bg-white/15"
                  >
                    <div
                      className="h-full rounded-full bg-cyan-300"
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    {fillPercent}% of {featured.capacity} seats filled
                  </p>
                </div>
              ) : null}

              <div className="mt-auto flex flex-col gap-2 sm:flex-row">
                {featured.registrationStatus === "open" &&
                featured.registerUrl ? (
                  <a
                    href={featured.registerUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "my-target h-10 rounded-full bg-cyan-300 px-5 text-slate-900 hover:bg-cyan-200"
                    )}
                  >
                    Register Now
                    <ArrowRight className="size-4" />
                  </a>
                ) : null}
                <Link
                  href={`/events/${featured.slug}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "my-target h-10 rounded-full border-white/30 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
                  )}
                >
                  Event Details
                </Link>
              </div>
            </div>
          </div>

          <Countdown startsAt={getEventStart(featured)} />
        </div>
      ) : null}

      <div className="flex flex-col gap-4">
        <label className="relative block">
          <span className="sr-only">Search upcoming events</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events..."
            className="h-11 w-full rounded-full border border-white/15 bg-white/5 pr-4 pl-11 text-sm text-white placeholder:text-slate-400 focus-visible:border-cyan-300/60 focus-visible:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {["All", ...eventCategories].map((option) => (
            <Button
              key={option}
              size="lg"
              variant={category === option ? "default" : "outline"}
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
              className={cn(
                "my-target h-9 rounded-full px-4",
                category === option
                  ? "bg-cyan-300 text-slate-900 hover:bg-cyan-200"
                  : "border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
              )}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard
              key={event.slug}
              event={event}
              variant="upcoming"
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-white/15 bg-white/5 px-6 py-12 text-center text-sm text-slate-300">
          No upcoming events match these filters.
        </p>
      )}

      <div className="flex justify-center">
        <a
          href="#calendar"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "my-target h-10 rounded-full border-white/30 bg-transparent px-6 text-white hover:bg-white/10 hover:text-white"
          )}
        >
          <CalendarDays className="my-target size-4" />
          View Calendar
        </a>
      </div>
    </section>
  )
}
