import Link from "next/link"
import { ArrowRight, CalendarDays, MapPin, Pencil } from "lucide-react"

import { EventCover } from "@/components/events/event-cover"
import { EventStatusBadge } from "@/components/events/event-status-badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatEventDate, formatEventMonth, type ClubEvent } from "@/lib/events"

export function EventCard({
  event,
  variant = "past",
  onEdit,
}: {
  event: ClubEvent
  variant?: "past" | "upcoming"
  onEdit?: (event: ClubEvent) => void
}) {
  const canRegister =
    variant === "upcoming" &&
    event.registrationStatus === "open" &&
    Boolean(event.registerUrl)

  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm transition-colors hover:border-cyan-300/40">
      <div className="relative aspect-16/9 w-full overflow-hidden">
        <EventCover src={event.gallery[0]} alt={event.title} seed={event.slug} />
        <span className="absolute top-3 left-3 rounded-full border border-white/25 bg-slate-950/70 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase">
          {event.category}
        </span>
        {onEdit ? (
          <Button
            size="icon-sm"
            variant="outline"
            aria-label={`Edit ${event.title}`}
            onClick={() => onEdit(event)}
            className="absolute top-3 right-3 rounded-full border-white/25 bg-slate-950/70 text-white hover:bg-slate-900"
          >
            <Pencil className="size-3.5" />
          </Button>
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg font-semibold text-white">{event.title}</h3>
        <p className="flex items-center gap-2 text-sm text-slate-300">
          <CalendarDays className="size-4" />
          {variant === "upcoming"
            ? `${formatEventDate(event.date)} · ${event.time}`
            : formatEventMonth(event.date)}
        </p>
        <p className="flex items-center gap-2 text-sm text-slate-400">
          <MapPin className="size-4" />
          <span className="min-w-0 truncate">{event.venue}</span>
        </p>

        {variant === "upcoming" && event.registrationStatus ? (
          <EventStatusBadge status={event.registrationStatus} />
        ) : (
          <p className="line-clamp-2 text-sm text-slate-300">{event.summary}</p>
        )}

        {canRegister ? (
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Register for ${event.title}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-auto h-9 w-full rounded-full bg-cyan-300 text-slate-900 hover:bg-cyan-200"
            )}
          >
            Register
            <ArrowRight className="size-4" />
          </a>
        ) : (
          <Link
            href={`/events/${event.slug}`}
            aria-label={`View details for ${event.title} on ${formatEventDate(event.date)}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "mt-auto h-9 w-full rounded-full border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            )}
          >
            Details
            <ArrowRight className="size-4" />
          </Link>
        )}
      </div>
    </article>
  )
}
