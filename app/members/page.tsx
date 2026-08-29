import { MemberDirectory } from "@/components/members/member-directory"
import { NavigationMenuDemo } from "@/components/navigation"
import { members } from "@/lib/members"

export const metadata = {
  title: "Members | OS Code IIIT Dharwad",
  description:
    "Meet the leads, core team, contributors and alumni of the OS Code open source club at IIIT Dharwad.",
  icons: {
    icon: "/oscode.ico",
  },
}

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full">
          <NavigationMenuDemo />
        </div>

        <MemberDirectory members={members} />
      </main>
    </div>
  )
}
