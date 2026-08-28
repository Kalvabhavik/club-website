"use client"

import * as React from "react"

type Remaining = { days: number; hours: number; minutes: number; seconds: number }

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000)
  return () => clearInterval(id)
}

function remainingUntil(target: number, now: number): Remaining {
  const diff = Math.max(0, target - now)
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export function Countdown({ startsAt }: { startsAt: string }) {
  const target = new Date(startsAt).getTime()
  const seconds = React.useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => null
  )
  const remaining = seconds === null ? null : remainingUntil(target, seconds * 1000)

  const units: { label: string; value: number | null }[] = [
    { label: "Days", value: remaining?.days ?? null },
    { label: "Hours", value: remaining?.hours ?? null },
    { label: "Min", value: remaining?.minutes ?? null },
    { label: "Sec", value: remaining?.seconds ?? null },
  ]

  return (
    <div className="space-y-3">
      <p className="text-center text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
        Event starts in
      </p>
      <div className="mx-auto grid max-w-md grid-cols-4 gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="rounded-2xl border border-white/15 bg-white/10 px-2 py-3 text-center backdrop-blur-sm"
          >
            <p
              suppressHydrationWarning
              className="font-mono text-2xl font-semibold tabular-nums text-white sm:text-3xl"
            >
              {unit.value === null
                ? "--"
                : String(unit.value).padStart(2, "0")}
            </p>
            <p className="mt-1 text-xs tracking-wide text-slate-300 uppercase">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
