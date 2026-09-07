import { Hero } from "@/components/hero"
import { NavigationMenuDemo } from "@/components/navigation"
import TargetCursorWrapper from "@/components/TargetCursorWrapper"
import GradientWaves from '@/components/GradientWaves';
import { ArrowUpRight, AtSign, MessageCircle, Users } from "lucide-react"

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

      <div className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-full w-full">
        <div className="h-full w-full">
          <GradientWaves
            horizonColor="#1E88E5"
            waveColor="#FF9FFC"
            crestColor="#FFFFFF"
            speed={0.4}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1}
            height={5.5}
            fogDepth={15}
            detail="medium"
            brightness={1}
            opacity={1}
            mouseInteraction
            parallaxStrength={0.5}
            grain
            grainIntensity={0.05}
          /></div>

      </div>
{/* 
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" /> */}
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full">

          <NavigationMenuDemo />
        </div>

           <TargetCursorWrapper />
        <div className="w-full">

          <Hero />
        </div>

        <section className="grid gap-10 border-t border-white/10 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
              A few quick answers
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              New here? Start here.
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
              Open source is easier when you have people to ask. Bring your
              questions, your half-finished idea, or just your curiosity.
            </p>
          </div>

          <div className="space-y-3">
            {[
              ["Do I need to be an expert to join?", "No. Start with what you know, pick a small task, and learn with the team."],
              ["What can I contribute?", "Code, design, documentation, testing, event support, and ideas are all useful contributions."],
              ["How do I find a first issue?", "Visit the Projects page, choose a repository, and look for a small issue or a good-first-issue label."],
              ["Can I work on an idea with the club?", "Yes. Bring it to a meetup or reach out through one of our community channels and we can help you shape it."],
            ].map(([question, answer]) => (
              <details key={question} className="group rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 backdrop-blur-sm">
                <summary className="my-target flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white marker:hidden">
                  {question}
                  <span className="text-xl font-light text-cyan-300 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pt-3 text-sm leading-relaxed text-slate-300">{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/10 py-10">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-lg font-semibold text-white">OS Code Club</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
                Build in public. Learn together. Leave the codebase better.
              </p>
              <p className="mt-4 text-xs text-slate-500">IIIT Dharwad · Open Source Community</p>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
                Contact us
              </p>
              <div className="flex flex-wrap gap-2">
                <a href="https://www.instagram.com/oscode_iiitdwd?stkn=YWJodzhxYm94NGRw" target="_blank" rel="noreferrer" className="my-target inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-pink-300/60 hover:text-white">
                  <AtSign className="size-4" /> Instagram
                </a>
                <a href="https://www.linkedin.com/company/os-code-iiit-dwd/" target="_blank" rel="noreferrer" className="my-target inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-sky-300/60 hover:text-white">
                  <Users className="size-4" /> LinkedIn
                </a>
                <a href="https://wa.me/" target="_blank" rel="noreferrer" className="my-target inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-emerald-300/60 hover:text-white">
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
                <a href="https://discord.gg/2ucjFATtV" target="_blank" rel="noreferrer" className="my-target inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition-colors hover:border-indigo-300/60 hover:text-white">
                  <ArrowUpRight className="size-4" /> Discord
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}