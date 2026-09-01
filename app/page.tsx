import { Hero } from "@/components/hero"
import { NavigationMenuDemo } from "@/components/navigation"
import TargetCursor from "@/components/TargetCursor"

export const metadata = {
  title: "OS Code IIIT Dharwad",
  description: "OS Code IIIT Dharwad",
  icons: {
    icon: "/oscode.ico",
  },
}

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />

      <TargetCursor
       cursorColorOnTarget={undefined}
        targetSelector=".my-target"
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
                

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full">
          <NavigationMenuDemo />
        </div>
        

        <div className="w-full">
          <Hero />
        </div>

        {/* TODO: FAQ and Footer */}
      </main>
    </div>
  )
}