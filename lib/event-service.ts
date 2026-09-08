import { connectToDatabase } from "@/lib/db"
import { EventModel, type EventDoc } from "@/lib/models/event"
import {
  eventCategories,
  type ClubEvent,
  type EventCategory,
  type EventOrganizer,
  type EventResource,
  type RegistrationStatus,
} from "@/lib/events"

const modes: ClubEvent["mode"][] = ["online", "offline", "hybrid"]
const statuses: RegistrationStatus[] = ["open", "soon", "closed"]
const resourceTypes: EventResource["type"][] = [
  "slides",
  "repo",
  "video",
  "article",
]

function toClubEvent(doc: EventDoc): ClubEvent {
  return {
    slug: doc.slug,
    title: doc.title,
    subtitle: doc.subtitle ?? undefined,
    category: doc.category as EventCategory,
    date: doc.date,
    startsAt: doc.startsAt ?? undefined,
    time: doc.time ?? "",
    venue: doc.venue ?? "",
    mode: (doc.mode ?? "offline") as ClubEvent["mode"],
    summary: doc.summary ?? "",
    description: doc.description ?? "",
    tags: doc.tags ?? [],
    organizers: (doc.organizers ?? []).map((organizer) => ({
      name: organizer.name,
      role: organizer.role,
      github: organizer.github ?? undefined,
    })),
    gallery: doc.gallery ?? [],
    resources: (doc.resources ?? []).map((resource) => ({
      label: resource.label,
      href: resource.href,
      type: (resource.type ?? "article") as EventResource["type"],
    })),
    registrationStatus: (doc.registrationStatus ?? undefined) as
      RegistrationStatus | undefined,
    registerUrl: doc.registerUrl ?? undefined,
    capacity: doc.capacity ?? undefined,
    registered: doc.registered ?? undefined,
    attendees: doc.attendees ?? undefined,
    featured: doc.featured ?? false,
  }
}

export async function listEvents(): Promise<ClubEvent[]> {
  await connectToDatabase()
  const docs = await EventModel.find().sort({ date: -1 }).lean<EventDoc[]>()
  return docs.map(toClubEvent)
}

export async function findEvent(slug: string): Promise<ClubEvent | null> {
  await connectToDatabase()
  const doc = await EventModel.findOne({ slug }).lean<EventDoc | null>()
  return doc ? toClubEvent(doc) : null
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export class EventInputError extends Error {}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function optionalText(value: unknown): string | undefined {
  const result = text(value)
  return result === "" ? undefined : result
}

function optionalNumber(value: unknown): number | undefined {
  if (value === null || value === undefined || value === "") return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map(text).filter(Boolean)
}

function oneOf<T extends string>(value: unknown, allowed: T[]): T | undefined {
  const result = text(value)
  return (allowed as string[]).includes(result) ? (result as T) : undefined
}

/** Validates an untrusted request body into the shape the Event model expects. */
export function parseEventInput(body: unknown): Omit<ClubEvent, "slug"> {
  if (typeof body !== "object" || body === null) {
    throw new EventInputError("Invalid request body.")
  }
  const input = body as Record<string, unknown>

  const title = text(input.title)
  const date = text(input.date)
  if (!title) throw new EventInputError("Title is required.")
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new EventInputError("Date must be in YYYY-MM-DD format.")
  }

  const category = oneOf(input.category, [...eventCategories])
  if (!category) throw new EventInputError("Unknown event category.")

  const organizers: EventOrganizer[] = Array.isArray(input.organizers)
    ? input.organizers.flatMap((entry) => {
        const organizer = entry as Record<string, unknown>
        const name = text(organizer?.name)
        return name
          ? [
              {
                name,
                role: text(organizer?.role) || "Organizer",
                github: optionalText(organizer?.github),
              },
            ]
          : []
      })
    : []

  const resources: EventResource[] = Array.isArray(input.resources)
    ? input.resources.flatMap((entry) => {
        const resource = entry as Record<string, unknown>
        const label = text(resource?.label)
        const href = text(resource?.href)
        return label && href
          ? [
              {
                label,
                href,
                type: oneOf(resource?.type, resourceTypes) ?? "article",
              },
            ]
          : []
      })
    : []

  return {
    title,
    subtitle: optionalText(input.subtitle),
    category,
    date,
    startsAt: optionalText(input.startsAt),
    time: text(input.time),
    venue: text(input.venue),
    mode: oneOf(input.mode, modes) ?? "offline",
    summary: text(input.summary),
    description: text(input.description),
    tags: stringList(input.tags),
    organizers,
    gallery: stringList(input.gallery),
    resources,
    registrationStatus: oneOf(input.registrationStatus, statuses),
    registerUrl: optionalText(input.registerUrl),
    capacity: optionalNumber(input.capacity),
    registered: optionalNumber(input.registered),
    attendees: optionalNumber(input.attendees),
    featured: input.featured === true,
  }
}

export async function createEvent(
  input: Omit<ClubEvent, "slug">
): Promise<ClubEvent> {
  await connectToDatabase()

  const base = slugify(input.title)
  if (!base) throw new EventInputError("Title must contain letters or numbers.")

  let slug = base
  for (let suffix = 2; await EventModel.exists({ slug }); suffix += 1) {
    slug = `${base}-${suffix}`
  }

  const doc = await EventModel.create({ ...input, slug })
  return toClubEvent(doc.toObject() as EventDoc)
}

export async function updateEvent(
  slug: string,
  input: Omit<ClubEvent, "slug">
): Promise<ClubEvent | null> {
  await connectToDatabase()
  const doc = await EventModel.findOneAndUpdate(
    { slug },
    { $set: input },
    { new: true }
  ).lean<EventDoc | null>()
  return doc ? toClubEvent(doc) : null
}

export async function deleteEvent(slug: string): Promise<boolean> {
  await connectToDatabase()
  const result = await EventModel.deleteOne({ slug })
  return result.deletedCount > 0
}
