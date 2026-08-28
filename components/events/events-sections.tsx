"use client"

import * as React from "react"
import Link from "next/link"
import { Plus, ShieldCheck } from "lucide-react"

import { SignOutButton } from "@/components/auth/sign-out-button"
import { EventCalendar } from "@/components/events/event-calendar"
import { EventFormDialog } from "@/components/events/event-form-dialog"
import { PastEvents } from "@/components/events/past-events"
import { UpcomingEvents } from "@/components/events/upcoming-events"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  getFeaturedPastEvent,
  getFeaturedUpcomingEvent,
  getPastEventStats,
  getPastEvents,
  getUpcomingEvents,
  type ClubEvent,
} from "@/lib/events"

type Editing = { event?: ClubEvent } | null

export function EventsSections({
  events,
  memberName,
}: {
  events: ClubEvent[]
  memberName: string | null
}) {
  const [editing, setEditing] = React.useState<Editing>(null)

  const upcoming = getUpcomingEvents(events)
  const past = getPastEvents(events)
  const onEdit = memberName
    ? (event: ClubEvent) => setEditing({ event })
    : undefined

  return (
    <>
      {memberName ? (
        <div className="flex flex-col gap-3 rounded-2xl border border-emerald-300/25 bg-emerald-300/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-emerald-100">
            <ShieldCheck className="size-4" />
            Signed in as {memberName} - you can add and edit events.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="lg"
              onClick={() => setEditing({})}
              className="h-9 rounded-full bg-cyan-300 px-4 text-slate-900 hover:bg-cyan-200"
            >
              <Plus className="size-4" />
              Add event
            </Button>
            <SignOutButton />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-300">
            OS Code members can add and edit events after signing in.
          </p>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-9 rounded-full border-white/25 bg-transparent px-4 text-white hover:bg-white/10 hover:text-white"
            )}
          >
            Member login
          </Link>
        </div>
      )}

      <UpcomingEvents
        events={upcoming}
        featured={getFeaturedUpcomingEvent(events)}
        onEdit={onEdit}
      />

      <EventCalendar events={events} />

      <PastEvents
        events={past}
        featured={getFeaturedPastEvent(events)}
        stats={getPastEventStats(events)}
        onEdit={onEdit}
      />

      {editing ? (
        <EventFormDialog
          event={editing.event}
          onClose={() => setEditing(null)}
        />
      ) : null}
    </>
  )
}
