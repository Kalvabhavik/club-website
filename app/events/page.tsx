import { EventsSections } from "@/components/events/events-sections"
import { NavigationMenuDemo } from "@/components/navigation"
import { listEvents } from "@/lib/event-service"
import { getSession } from "@/lib/session"
import LiquidEther from "@/components/LiquidEther"
import TargetCursor from "@/components/TargetCursor"

export const metadata = {
  title: "Events | OS Code IIIT Dharwad",
  description:
    "Upcoming and past events hosted by the OS Code open source club at IIIT Dharwad.",
  icons: {
    icon: "/oscode.ico",
  },
}

export default async function Page() {
  const [events, session] = await Promise.all([listEvents(), getSession()])

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />

      <main className=" mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full">
          <NavigationMenuDemo />
        </div>
        <TargetCursor
       cursorColorOnTarget={undefined}
        targetSelector=".my-target"
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        />
        
        <EventsSections events={events} memberName={session?.name ?? null} />
      </main>
    </div>
  )
}
