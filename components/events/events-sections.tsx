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
