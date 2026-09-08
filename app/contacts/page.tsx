import Link from "next/link"
import { ArrowUpRight, CopyCheck, Sparkles, Users } from "lucide-react"

import { NavigationMenuDemo } from "@/components/navigation"
import MoltenMetal from "@/components/MoltenMetal"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const socialLinks = [
  {
    name: "Instagram",
    description: "Photos, reels, event highlights, and quick updates.",
    href: "https://www.instagram.com/",
    logo: "/social/instagram.svg",
    background: "#E4405F",
    accent: "from-fuchsia-500/25 via-pink-500/20 to-rose-500/20",
  },
  {
    name: "LinkedIn",
    description: "Alumni, partners, and professional opportunities.",
    href: "https://www.linkedin.com/",
    logo: "/social/linkedin.svg",
    background: "#0A66C2",
    accent: "from-sky-500/25 via-blue-500/20 to-indigo-500/20",
  },
  {
    name: "WhatsApp",
    description: "Community announcements and reminders.",
    href: "https://wa.me/",
    logo: "/social/whatsapp.svg",
    background: "#25D366",
    accent: "from-emerald-400/25 via-teal-500/20 to-cyan-500/20",
  },
  {
    name: "Discord",
    description: "Discussions, collaborations, and voice chats.",
    href: "https://discord.com/",
    logo: "/social/discord.svg",
    background: "#5865F2",
    accent: "from-violet-500/25 via-purple-500/20 to-slate-700/20",
  },
]

const highlights = [
  "Event drops and workshop announcements",
  "Project collaboration and mentoring",
  "Community updates in one place",
]

export const metadata = {
  title: "Contact Us | OS Code IIIT Dharwad",
  description: "Find OS Code IIIT Dharwad on Instagram, LinkedIn, WhatsApp, and Discord.",
  icons: {
    icon: "/oscode.ico",
  },
}

function SocialCard({
  name,
  description,
  href,
  logo,
  background,
  accent,
}: {
  name: string
  description: string
  href: string
  logo: string
  background: string
  accent: string
}) {
  return (
    <article className="group relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/10 p-5 text-white shadow-[0_18px_60px_-24px_rgba(15,23,42,0.55)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/14">
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-linear-to-r", accent)} />
      <div className="relative flex items-start gap-4">
        <div
          className="flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-lg shadow-black/20 ring-1 ring-white/10"
          style={{ backgroundColor: background }}
        >
          <img src={logo} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight sm:text-xl">
              {name}
            </h2>
            <span className="rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-100/90">
              Official
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
          <CopyCheck className="size-3.5" />
          Keep this URL updated
        </span>
        <Link
          href={href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-full border-white/15 bg-white/5 text-white hover:border-white/25 hover:bg-white/10 hover:text-white"
          )}
        >
          Open link
          <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </article>
  )
}

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
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
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.3}
          opacity={1.0}
        />
      </div>

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <NavigationMenuDemo />

        <section className="rounded-[2.25rem] border border-white/12 bg-white/8 shadow-2xl shadow-slate-950/30 backdrop-blur-sm">
          <div>
            <div className="relative p-8 sm:p-10 lg:p-14">
              <p className="inline-flex w-max items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
                <Sparkles className="size-4" />
                Stay Connected
              </p>

              <div className="mt-6 space-y-5">
                <h1 className="max-w-2xl text-pretty text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Find your way into the community.
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
                  Follow OS Code IIIT Dharwad for events, project collaborations,
                  and the conversations happening between meetups.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-slate-100 shadow-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                  <p className="text-3xl font-semibold tracking-tight">4</p>
                  <p className="mt-1 text-sm text-slate-300">social channels</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                  <p className="text-3xl font-semibold tracking-tight">24/7</p>
                  <p className="mt-1 text-sm text-slate-300">community access</p>
                </div>
                <div className="rounded-2xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                  <p className="text-3xl font-semibold tracking-tight">Fast</p>
                  <p className="mt-1 text-sm text-slate-300">easy to update</p>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link
                  href="/events"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-10 w-full rounded-full bg-cyan-300 px-5 text-slate-900 hover:bg-cyan-200 sm:w-auto"
                  )}
                >
                  Explore Events
                </Link>
                <Link
                  href="/resources"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-10 w-full rounded-full border-white/20 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
                  )}
                >
                  Start Contributing
                </Link>
              </div>
            </div>

            <div className="border-t border-white/10 bg-white/5 p-8 lg:border-t-0 lg:border-l lg:p-10">
              <div className="flex items-center gap-3 text-cyan-100">
                <Users className="size-5" />
                <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                  Join the community
                </p>
              </div>

              <div className="mt-5 space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  Choose the channel that fits your vibe.
                </h2>
              </div>

              <div className="mt-8 grid gap-4">
                {socialLinks.map((link) => (
                  <SocialCard key={link.name} {...link} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
