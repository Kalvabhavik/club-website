"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatEventDate, type ClubEvent } from "@/lib/events"

const weekdays = ["S", "M", "T", "W", "T", "F", "S"]

function monthKey(year: number, month: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}`
}

function dayKey(year: number, month: number, day: number) {
  return `${monthKey(year, month)}-${String(day).padStart(2, "0")}`
}

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
      const next = new Date(
        Date.UTC(current.year, current.month + delta, 1)
      )

      return {
        year: next.getUTCFullYear(),
        month: next.getUTCMonth(),
      }
    })

    setSelected(null)
  }

  const selectedEvents = selected ? byDate.get(selected) ?? [] : []

  return (
    <section id="calendar" className="mx-auto w-full max-w-2xl space-y-5">
      {/* Header */}
      <div className="text-center">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
          Club Calendar
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Upcoming Events
        </h2>
      </div>

      {/* Calendar */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-xl backdrop-blur-md sm:p-5">
        {/* Month navigation */}
        <div className="mb-4 flex items-center justify-between">
          <Button
            size="icon"
            variant="ghost"
            aria-label="Previous month"
            onClick={() => shiftMonth(-1)}
            className="size-8 rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <ChevronLeft className="size-4" />
          </Button>

          <div className="text-center">
            <p className="text-sm font-semibold text-white">
              {monthLabel}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-500">
              Select a highlighted day
            </p>
          </div>

          <Button
            size="icon"
            variant="ghost"
            aria-label="Next month"
            onClick={() => shiftMonth(1)}
            className="size-8 rounded-full text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {/* Weekdays */}
        <div className="mb-1 grid grid-cols-7 text-center">
          {weekdays.map((weekday, index) => (
            <span
              key={`${weekday}-${index}`}
              className="py-1.5 text-[10px] font-medium uppercase text-slate-500"
            >
              {weekday}
            </span>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstWeekday }, (_, index) => (
            <span key={`empty-${index}`} />
          ))}

          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1
            const key = dayKey(cursor.year, cursor.month, day)
            const dayEvents = byDate.get(key) ?? []
            const hasEvents = dayEvents.length > 0
            const isSelected = selected === key

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
                onClick={() =>
                  setSelected(isSelected ? null : key)
                }
                className={cn(
                  "relative mx-auto flex size-9 items-center justify-center rounded-lg text-xs transition-all",
                  hasEvents
                    ? "cursor-pointer font-semibold text-white hover:scale-105 hover:bg-cyan-300/20"
                    : "cursor-default text-slate-600",
                  isSelected &&
                    "bg-cyan-300/20 text-cyan-200 ring-1 ring-cyan-300/50"
                )}
              >
                {day}

                {hasEvents && (
                  <span className="absolute bottom-1 size-1 rounded-full bg-cyan-300" />
                )}
              </button>
            )
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-500">
          <span className="size-1.5 rounded-full bg-cyan-300" />
          Event available
        </div>
      </div>

      {/* Selected event */}
      {selected && selectedEvents.length > 0 ? (
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
          <p className="mb-2 px-1 text-xs font-medium text-slate-400">
            {formatEventDate(selected)}
          </p>

          <div className="space-y-2">
            {selectedEvents.map((event) => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-cyan-300/30 hover:bg-white/[0.07]"
              >
                <span className="min-w-0 truncate text-xs font-medium text-white">
                  {event.title}
                </span>

                <span className="shrink-0 rounded-full bg-white/5 px-2 py-1 text-[9px] text-slate-400">
                  {event.category}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-[11px] text-slate-500">
          Select a highlighted date to view events.
        </p>
      )}
    </section>
  )
}