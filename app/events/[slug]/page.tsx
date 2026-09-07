import { EventDetail } from "@/components/events/event-detail"
import { NavigationMenuDemo } from "@/components/navigation"
import { findEvent } from "@/lib/event-service"
import { getSession } from "@/lib/session"
import TargetCursorWrapper from "@/components/TargetCursorWrapper"
import MoltenMetal from "@/components/MoltenMetal"

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
      <div className="pointer-events-none fixed -z-10 h-full w-full">
        <MoltenMetal
          color1="#1E88E5"
          color2="#3bc7df"
          color3="#FFFFFF"
          speed={0.35}
          scale={4}
          detail={3}
          glow={1.6}
          coreSize={0.1}
          swirl={1}
          fold={-0.2}
          blackPoint={0.05}
          brightness={1.3}
          colorMode="molten"
          grain
          grainIntensity={0.05}
          mouseInteraction
          mouseStrength={0.3}
          opacity={1}
        />
      </div>
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />

      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full">
          <NavigationMenuDemo />
        </div>
        <TargetCursorWrapper />

        <EventDetail event={event} isMember={session !== null} />
      </main>
    </div>
  )
}
