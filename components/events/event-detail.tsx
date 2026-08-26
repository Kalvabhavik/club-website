"use client"

import * as React from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  MapPin,
  Pencil,
  Users,
} from "lucide-react"

import { EventCover } from "@/components/events/event-cover"
import { EventFormDialog } from "@/components/events/event-form-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatEventDate, type ClubEvent } from "@/lib/events"

export function EventDetail({
  event,
  isMember,
}: {
  event: ClubEvent | null
  isMember: boolean
}) {
  const [editing, setEditing] = React.useState(false)

  if (!event) {
    return (
      <div className="space-y-4 rounded-3xl border border-white/15 bg-white/5 px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold text-white">Event not found</h1>
        <Link
          href="/events"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "h-10 rounded-full border-white/30 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
          )}
        >
          Back to events
        </Link>
      </div>
    )
  }

  return (
    <>
      <Link
        href="/events"
        className="inline-flex w-max items-center gap-2 text-sm text-slate-300 hover:text-white"
      >
        <ArrowLeft className="size-4" />
        Back to events
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex w-max rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
            {event.category}
          </span>
          {isMember ? (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(true)}
              className="h-8 rounded-full border-white/25 bg-transparent px-3 text-white hover:bg-white/10 hover:text-white"
            >
              <Pencil className="size-3.5" />
              Edit event
            </Button>
          ) : null}
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {event.title}
        </h1>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-300">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4" />
            {formatEventDate(event.date)} · {event.time}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="size-4" />
            {event.venue} ({event.mode})
          </span>
          {event.attendees ? (
            <span className="flex items-center gap-2">
              <Users className="size-4" />
              {event.attendees} attendees
            </span>
          ) : null}
        </div>
        <p className="max-w-3xl text-base text-slate-200">
          {event.description}
        </p>
        {event.registerUrl ? (
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-10 w-max rounded-full bg-cyan-300 px-5 text-slate-900 hover:bg-cyan-200"
            )}
          >
            Register
            <ArrowRight className="size-4" />
          </a>
        ) : null}
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Gallery</h2>
        {event.gallery.length === 0 ? (
          <p className="rounded-2xl border border-white/15 bg-white/5 px-6 py-10 text-center text-sm text-slate-300">
            Photos from this event will be published here soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {event.gallery.map((image, index) => (
              <div
                key={image}
                className="aspect-4/3 overflow-hidden rounded-2xl border border-white/15"
              >
                <EventCover
                  src={image}
                  alt={`${event.title} photo ${index + 1}`}
                  seed={`${event.slug}-${index}`}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Resources</h2>
        {event.resources.length === 0 ? (
          <p className="rounded-2xl border border-white/15 bg-white/5 px-6 py-10 text-center text-sm text-slate-300">
            No resources have been shared for this event yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {event.resources.map((resource) => (
              <li key={resource.href}>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-sm text-white transition-colors hover:border-cyan-300/40"
                >
                  <span className="min-w-0">
                    <span className="block font-medium">{resource.label}</span>
                    <span className="block text-xs text-slate-400 capitalize">
                      {resource.type}
                    </span>
                  </span>
                  <ExternalLink className="size-4 shrink-0 text-slate-300" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-white">Organised by</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {event.organizers.map((organizer) => (
            <li
              key={organizer.name}
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4"
            >
              <p className="font-medium text-white">{organizer.name}</p>
              <p className="text-sm text-slate-400">{organizer.role}</p>
              {organizer.github ? (
                <a
                  href={`https://github.com/${organizer.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-cyan-200 hover:text-cyan-100"
                >
                  @{organizer.github}
                  <ExternalLink className="size-3.5" />
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      {editing ? (
        <EventFormDialog event={event} onClose={() => setEditing(false)} />
      ) : null}
    </>
  )
}
