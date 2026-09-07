"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { LoaderCircle, Plus, Trash2, Upload, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  eventCategories,
  type ClubEvent,
  type EventCategory,
  type EventGalleryItem,
  type RegistrationStatus,
} from "@/lib/events"

const fieldClass =
  "h-10 w-full rounded-xl border border-white/15 bg-white/5 px-3 text-sm text-white placeholder:text-slate-400 focus-visible:border-cyan-300/60 focus-visible:outline-none"

const modes: ClubEvent["mode"][] = ["offline", "online", "hybrid"]
const statuses: RegistrationStatus[] = ["open", "soon", "closed"]

const defaultGalleryItem: EventGalleryItem = {
  image: "",
  label: "Event highlights",
  link: "",
  alt: "",
}

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
  const [galleryItems, setGalleryItems] = React.useState<EventGalleryItem[]>(
    () => event?.gallery.map((item) => ({ ...item })) ?? []
  )
  const [uploadingIndex, setUploadingIndex] = React.useState<number | null>(null)

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

  async function uploadGalleryImage(index: number, file: File) {
    setError(null)
    setUploadingIndex(index)
    const body = new FormData()
    body.set("file", file)

    try {
      const response = await fetch("/api/uploads/github", {
        method: "POST",
        body,
      })
      const result = (await response.json().catch(() => null)) as {
        error?: string
        url?: string
      } | null

      if (!response.ok || !result?.url) {
        setError(result?.error ?? "Could not upload the image.")
        return
      }

      setGalleryItems((items) =>
        items.map((item, itemIndex) =>
          itemIndex === index
            ? { ...item, image: result.url!, link: result.url }
            : item
        )
      )
    } catch {
      setError("Could not upload the image. Try again.")
    } finally {
      setUploadingIndex(null)
    }
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

    const gallery = galleryItems
      .map((item) => ({
        image: item.image.trim(),
        label: item.label.trim() || "Event highlight",
        link: item.link?.trim() || undefined,
        alt: item.alt?.trim() || undefined,
      }))
      .filter((item) => item.image)

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
            <div className="space-y-3 sm:col-span-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium text-slate-200">
                    Gallery panels
                  </h3>
                  <p className="mt-1 max-w-xl text-xs text-slate-400">
                    Upload an image to GitHub or paste a URL. Uploaded images automatically become the panel image and click-through link.
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    setGalleryItems((items) => [
                      ...items,
                      {
                        ...defaultGalleryItem,
                        label: `Gallery panel ${items.length + 1}`,
                      },
                    ])
                  }
                  className="h-9 rounded-full border-white/25 bg-transparent px-3 text-white hover:bg-white/10 hover:text-white"
                >
                  <Plus className="size-4" />
                  Add panel
                </Button>
              </div>

              {galleryItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 px-4 py-5 text-center text-xs text-slate-400">
                  No gallery panels yet. Add one to show event photos here.
                </div>
              ) : (
                <div className="space-y-3">
                  {galleryItems.map((item, index) => (
                    <div
                      key={index}
                      className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2"
                    >
                      <div className="flex items-center justify-between gap-3 sm:col-span-2">
                        <span className="text-xs font-semibold tracking-wide text-cyan-200 uppercase">
                          Panel {index + 1}
                        </span>
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="ghost"
                          aria-label={`Remove gallery panel ${index + 1}`}
                          onClick={() =>
                            setGalleryItems((items) =>
                              items.filter((_, itemIndex) => itemIndex !== index)
                            )
                          }
                          className="text-slate-400 hover:text-red-300"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                      <label className="space-y-1.5">
                        <span className="text-sm text-slate-300">Panel name</span>
                        <input
                          value={item.label}
                          onChange={(change) =>
                            setGalleryItems((items) =>
                              items.map((current, itemIndex) =>
                                itemIndex === index
                                  ? { ...current, label: change.target.value }
                                  : current
                              )
                            )
                          }
                          placeholder="Project showcase"
                          className={fieldClass}
                        />
                      </label>
                      <label className="space-y-1.5">
                        <span className="text-sm text-slate-300">Image URL</span>
                        <input
                          value={item.image}
                          onChange={(change) =>
                            setGalleryItems((items) =>
                              items.map((current, itemIndex) =>
                                itemIndex === index
                                  ? { ...current, image: change.target.value }
                                  : current
                              )
                            )
                          }
                          placeholder="https://..."
                          className={fieldClass}
                        />
                        <span className="flex items-center gap-2 text-xs text-slate-400">
                          <Upload className="size-3.5 text-cyan-200" />
                          Upload from your device
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingIndex === index || pending}
                          onChange={(change) => {
                            const file = change.target.files?.[0]
                            if (file) void uploadGalleryImage(index, file)
                            change.target.value = ""
                          }}
                          className="block w-full cursor-pointer text-xs text-slate-400 file:mr-3 file:rounded-full file:border-0 file:bg-cyan-300 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-950 hover:file:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        {uploadingIndex === index ? (
                          <span className="inline-flex items-center gap-1.5 text-xs text-cyan-200">
                            <LoaderCircle className="size-3.5 animate-spin" />
                            Uploading to GitHub...
                          </span>
                        ) : null}
                      </label>
                      <label className="space-y-1.5">
                        <span className="text-sm text-slate-300">Click-through link (optional)</span>
                        <input
                          value={item.link ?? ""}
                          onChange={(change) =>
                            setGalleryItems((items) =>
                              items.map((current, itemIndex) =>
                                itemIndex === index
                                  ? { ...current, link: change.target.value }
                                  : current
                              )
                            )
                          }
                          placeholder="https://github.com/..."
                          className={fieldClass}
                        />
                      </label>
                      <label className="space-y-1.5">
                        <span className="text-sm text-slate-300">Accessible alt text (optional)</span>
                        <input
                          value={item.alt ?? ""}
                          onChange={(change) =>
                            setGalleryItems((items) =>
                              items.map((current, itemIndex) =>
                                itemIndex === index
                                  ? { ...current, alt: change.target.value }
                                  : current
                              )
                            )
                          }
                          placeholder="Members presenting their project"
                          className={fieldClass}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <label className="space-y-1.5 sm:col-span-2">
              <span className="text-sm text-slate-300">
                Resources URLs (one per line)
              </span>
              <textarea
                name="resources"
                rows={3}
                defaultValue={event?.resources.join("\n")}
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
              disabled={pending || uploadingIndex !== null}
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
