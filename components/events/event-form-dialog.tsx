"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  eventCategories,
  type ClubEvent,
  type EventCategory,
  type RegistrationStatus,
} from "@/lib/events"

const fieldClass =
  "h-10 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-slate-400 focus-visible:border-cyan-300/60 focus-visible:outline-none"

const modes: ClubEvent["mode"][] = ["offline", "online", "hybrid"]
const statuses: RegistrationStatus[] = ["open", "soon", "closed"]

function toNumber(value: FormDataEntryValue | null): number | undefined {
  const parsed = Number(value)
  return value === null || value === "" || Number.isNaN(parsed)
    ? undefined
    : parsed
}

function toText(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : ""
}

export function EventFormDialog({
  event,
  onClose,
}: {
  event?: ClubEvent
  onClose: () => void
}) {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  async function send(method: "POST" | "PUT" | "DELETE", body?: unknown) {
    setPending(true)
    const url = event ? `/api/events/${event.slug}` : "/api/events"
    const response = await fetch(url, {
      method,
      headers: body ? { "content-type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
    setPending(false)

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as {
        error?: string
      } | null
      setError(data?.error ?? "Could not save the event. Try again.")
      return
    }

    router.refresh()
    onClose()
  }

  function handleSubmit(formEvent: React.FormEvent<HTMLFormElement>) {
    formEvent.preventDefault()
    const data = new FormData(formEvent.currentTarget)

    const title = toText(data.get("title"))
    const date = toText(data.get("date"))
    if (!title || !date) {
      setError("Title and date are required.")
      return
    }

    const gallery = toText(data.get("gallery"))
      .split(/[\n,]/)
      .map((entry) => entry.trim())
      .filter(Boolean)

    void send(event ? "PUT" : "POST", {
      title,
      subtitle: toText(data.get("subtitle")) || undefined,
      category: toText(data.get("category")) as EventCategory,
      date,
      startsAt: toText(data.get("startsAt")) || undefined,
      time: toText(data.get("time")),
      venue: toText(data.get("venue")),
      mode: toText(data.get("mode")) as ClubEvent["mode"],
      summary: toText(data.get("summary")),
      description: toText(data.get("description")),
      tags: event?.tags ?? [],
      organizers: event?.organizers ?? [
        { name: "OS Code Core Team", role: "Organizer" },
      ],
      gallery,
      resources: event?.resources ?? [],
      registrationStatus:
        (toText(data.get("registrationStatus")) as RegistrationStatus) ||
        undefined,
      registerUrl: toText(data.get("registerUrl")) || undefined,
      capacity: toNumber(data.get("capacity")),
      registered: toNumber(data.get("registered")),
      attendees: toNumber(data.get("attendees")),
      featured: event?.featured ?? false,
    })
  }

  function handleDelete() {
    if (event) void send("DELETE")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={event ? `Edit ${event.title}` : "Add event"}
        className="my-8 w-full max-w-2xl rounded-3xl border border-white/15 bg-slate-950 p-6 sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-white">
            {event ? "Edit event" : "Add event"}
          </h2>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Close"
            onClick={onClose}
            className="text-slate-300 hover:text-white"
          >
            <X className="size-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-sm text-slate-300">Title</span>
              <input
                name="title"
                defaultValue={event?.title}
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-sm text-slate-300">Subtitle</span>
              <input
                name="subtitle"
                defaultValue={event?.subtitle}
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">Category</span>
              <select
                name="category"
                defaultValue={event?.category ?? "Workshop"}
                className={cn(fieldClass, "bg-slate-950")}
              >
                {eventCategories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">Date</span>
              <input
                type="date"
                name="date"
                defaultValue={event?.date}
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">Time (display)</span>
              <input
                name="time"
                defaultValue={event?.time}
                placeholder="5:00 PM - 7:00 PM"
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">
                Starts at (countdown)
              </span>
              <input
                name="startsAt"
                defaultValue={event?.startsAt}
                placeholder="2026-09-15T10:00:00+05:30"
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">Venue</span>
              <input
                name="venue"
                defaultValue={event?.venue}
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">Mode</span>
              <select
                name="mode"
                defaultValue={event?.mode ?? "offline"}
                className={cn(fieldClass, "bg-slate-950")}
              >
                {modes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">
                Registration status
              </span>
              <select
                name="registrationStatus"
                defaultValue={event?.registrationStatus ?? ""}
                className={cn(fieldClass, "bg-slate-950")}
              >
                <option value="">None</option>
                {statuses.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">Registration URL</span>
              <input
                name="registerUrl"
                defaultValue={event?.registerUrl}
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">Capacity</span>
              <input
                type="number"
                min={0}
                name="capacity"
                defaultValue={event?.capacity}
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">Registered</span>
              <input
                type="number"
                min={0}
                name="registered"
                defaultValue={event?.registered}
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5">
              <span className="text-sm text-slate-300">
                Attendees (past events)
              </span>
              <input
                type="number"
                min={0}
                name="attendees"
                defaultValue={event?.attendees}
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-sm text-slate-300">Summary</span>
              <input
                name="summary"
                defaultValue={event?.summary}
                className={fieldClass}
              />
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-sm text-slate-300">Description</span>
              <textarea
                name="description"
                rows={4}
                defaultValue={event?.description}
                className={cn(fieldClass, "h-auto py-2")}
              />
            </label>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-sm text-slate-300">
                Gallery image URLs (one per line)
              </span>
              <textarea
                name="gallery"
                rows={3}
                defaultValue={event?.gallery.join("\n")}
                className={cn(fieldClass, "h-auto py-2")}
              />
            </label>
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-300">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            {event ? (
              <Button
                type="button"
                size="lg"
                variant="destructive"
                disabled={pending}
                onClick={handleDelete}
                className="h-10 rounded-full px-5"
              >
                Delete
              </Button>
            ) : null}
            <Button
              type="button"
              size="lg"
              variant="outline"
              onClick={onClose}
              className="h-10 rounded-full border-white/30 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={pending}
              className="h-10 rounded-full bg-cyan-300 px-5 text-slate-900 hover:bg-cyan-200"
            >
              {pending ? "Saving..." : "Save event"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
