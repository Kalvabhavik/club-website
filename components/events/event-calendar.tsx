"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatEventDate, type ClubEvent } from "@/lib/events"

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function monthKey(year: number, month: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}`
}

function dayKey(year: number, month: number, day: number): string {
  return `${monthKey(year, month)}-${String(day).padStart(2, "0")}`
}

/** In-site month calendar; days with events are highlighted and clickable. */
export function EventCalendar({ events }: { events: ClubEvent[] }) {
  const initial = events[0]?.date ?? new Date().toISOString().slice(0, 10)
  const [cursor, setCursor] = React.useState(() => {
    const [year, month] = initial.split("-").map(Number)
    return { year, month: month - 1 }
  })
  const [selected, setSelected] = React.useState<string | null>(null)

  const byDate = React.useMemo(() => {
    const map = new Map<string, ClubEvent[]>()
    for (const event of events) {
      map.set(event.date, [...(map.get(event.date) ?? []), event])
    }
    return map
  }, [events])

  const firstWeekday = new Date(
    Date.UTC(cursor.year, cursor.month, 1)
  ).getUTCDay()
  const daysInMonth = new Date(
    Date.UTC(cursor.year, cursor.month + 1, 0)
  ).getUTCDate()
  const monthLabel = new Date(
    Date.UTC(cursor.year, cursor.month, 1)
  ).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })

  function shiftMonth(delta: number) {
    setCursor((current) => {
      const next = new Date(Date.UTC(current.year, current.month + delta, 1))
      return { year: next.getUTCFullYear(), month: next.getUTCMonth() }
    })
    setSelected(null)
  }

  const selectedEvents = selected ? (byDate.get(selected) ?? []) : []

  return (
    <section id="calendar" className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <p className="text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
          Club Calendar
        </p>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Every event, month by month
        </h2>
      </div>

      <div className="rounded-3xl border border-white/15 bg-white/5 p-4 backdrop-blur-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <Button
            size="icon"
            variant="outline"
            aria-label="Previous month"
            onClick={() => shiftMonth(-1)}
            className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <p className="text-lg font-semibold text-white">{monthLabel}</p>
          <Button
            size="icon"
            variant="outline"
            aria-label="Next month"
            onClick={() => shiftMonth(1)}
            className="rounded-full border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400">
          {weekdays.map((weekday) => (
            <span key={weekday} className="py-1">
              {weekday}
            </span>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {Array.from({ length: firstWeekday }, (_, index) => (
            <span key={`pad-${index}`} />
          ))}

          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1
            const key = dayKey(cursor.year, cursor.month, day)
            const dayEvents = byDate.get(key) ?? []
            const hasEvents = dayEvents.length > 0

            return (
              <button
                key={key}
                type="button"
                disabled={!hasEvents}
                aria-label={
                  hasEvents
                    ? `${dayEvents.length} event(s) on ${key}`
                    : undefined
                }
                aria-pressed={selected === key}
                onClick={() => setSelected(selected === key ? null : key)}
                className={cn(
                  "aspect-square rounded-xl border text-sm transition-colors",
                  hasEvents
                    ? "border-cyan-300/50 bg-cyan-300/15 font-semibold text-white hover:bg-cyan-300/25"
                    : "border-transparent text-slate-400",
                  selected === key && "border-cyan-200 bg-cyan-300/35"
                )}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      {selected ? (
        <div className="space-y-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-4">
          <p className="text-sm font-semibold text-white">
            {formatEventDate(selected)}
          </p>
          <ul className="space-y-2">
            {selectedEvents.map((event) => (
              <li key={event.slug}>
                <Link
                  href={`/events/${event.slug}`}
                  className="flex items-center justify-between gap-4 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white hover:border-cyan-300/40"
                >
                  <span className="min-w-0 truncate">{event.title}</span>
                  <span className="shrink-0 text-xs text-slate-400">
                    {event.category}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center text-sm text-slate-400">
          Highlighted days have events - pick one to see what is on.
        </p>
      )}
    </section>
  )
}
