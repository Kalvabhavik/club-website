import { EventDetail } from "@/components/events/event-detail"
import { NavigationMenuDemo } from "@/components/navigation"
import { findEvent } from "@/lib/event-service"
import { getSession } from "@/lib/session"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const event = await findEvent(slug)

  if (!event) {
    return { title: "Event not found | OS Code IIIT Dharwad", icons: { icon: "/oscode.ico" } }
  }

  return {
    title: `${event.title} | OS Code IIIT Dharwad`,
    description: event.summary,
    icons: { icon: "/oscode.ico" },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [event, session] = await Promise.all([findEvent(slug), getSession()])

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full">
          <NavigationMenuDemo />
        </div>

        <EventDetail event={event} isMember={session !== null} />
      </main>
    </div>
  )
}
