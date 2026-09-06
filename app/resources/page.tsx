import { NavigationMenuDemo } from "@/components/navigation"
import BorderGlow from "@/components/BorderGlow"
import MoltenMetal from "@/components/MoltenMetal"
import TargetCursorWrapper from "@/components/TargetCursorWrapper"
import { ArrowUpRight, GitBranch, GitPullRequest } from "lucide-react"

export const metadata = {
  title: "Projects | OS Code IIIT Dharwad",
  description:
    "Explore open-source projects from OS Code IIIT Dharwad and learn how to contribute.",
  icons: {
    icon: "/oscode.ico",
  },
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

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full">
          <NavigationMenuDemo />
        </div>
        <TargetCursorWrapper />

        <BorderGlow
          backgroundColor="transparent"
          borderRadius={32}
          glowColor="185 80 70"
          colors={["#22d3ee", "#34d399", "#fbbf24"]}
        >
          <section className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Start contributing
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                You can contribute before you know everything.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Pick something small, ask questions, and learn as you go. That is
                how most useful contributions begin at OS Code.
              </p>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                ["01", "Find a small issue", "Start with a bug, a missing detail in the docs, or a good-first-issue label."],
                ["02", "Make the change", "Fork the project, create a branch, and keep your pull request focused."],
                ["03", "Ask and improve", "Open the pull request, explain your approach, and use review as part of the work."],
              ].map(([number, title, description]) => (
                <div key={number} className="border-t border-white/20 pt-5">
                  <span className="text-sm font-semibold text-cyan-300">{number}</span>
                  <h3 className="mt-3 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3 text-sm text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-4 py-2">
                <GitBranch className="size-4 text-cyan-300" />
                Fork the repo
              </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-4 py-2">
                <GitPullRequest className="size-4 text-emerald-300" />
                Open a PR
              </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-4 py-2">
                <ArrowUpRight className="size-4 text-amber-300" />
                Learn together
              </span>
            </div>
          </section>
        </BorderGlow>

        <BorderGlow
          backgroundColor="transparent"
          borderRadius={32}
          glowColor="165 75 62"
          colors={["#22d3ee", "#34d399", "#fbbf24"]}
        >
        <section className="px-6 py-10 sm:px-10 sm:py-14">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">What we are building</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Useful software, made together.
            </h2>
            <p className="mt-3 text-slate-300">
              Our projects start with problems we see around us. They are open
              so more students can use them, learn from them, and help shape what
              comes next.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <BorderGlow backgroundColor="transparent" borderRadius={24} glowColor="185 80 70" colors={["#22d3ee", "#34d399", "#fbbf24"]}>
            <article className="group relative overflow-hidden rounded-3xl bg-transparent p-7 sm:p-9">
              <div className="absolute -right-16 -top-16 size-48 rounded-full bg-cyan-400/20 blur-3xl transition duration-500 group-hover:bg-cyan-300/30" />
              <div className="relative">
                <p className="text-sm font-medium text-cyan-300">01 / Mobile app</p>
                <h3 className="mt-5 text-3xl font-semibold text-white">Hyve</h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-200">
                  Hyve is a general-purpose mobile app for college life. It brings
                  everyday campus information and useful student tools into one
                  place.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {['Flutter' , 'Supabase','Open Source'].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">{tag}</span>
                  ))}
                </div>
                <a href="https://github.com/os-code-iiitdwd" target="_blank" rel="noreferrer" className="my-target mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-cyan-300">
                  See our GitHub work <ArrowUpRight className="size-4" />
                </a>
              </div>
            </article>
            </BorderGlow>

            <BorderGlow backgroundColor="transparent" borderRadius={24} glowColor="165 75 62" colors={["#22d3ee", "#34d399", "#fbbf24"]}>
            <article className="group relative overflow-hidden rounded-3xl bg-transparent p-7 sm:p-9">
              <div className="absolute -bottom-20 -right-10 size-52 rounded-full bg-emerald-400/15 blur-3xl transition duration-500 group-hover:bg-emerald-300/25" />
              <div className="relative">
                <p className="text-sm font-medium text-emerald-300">02 / Club website</p>
                <h3 className="mt-5 text-3xl font-semibold text-white">OS Code Club Website</h3>
                <p className="mt-4 text-lg leading-relaxed text-slate-200">
                  This website is open source too. It helps us share events,
                  introduce the team, publish resources, and give new contributors
                  a first project to work on.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {['Next.js', 'ShadCN', 'Open source'].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs text-slate-300">{tag}</span>
                  ))}
                </div>
                <a href="https://github.com/os-code-iiitdwd" target="_blank" rel="noreferrer" className="my-target mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-emerald-300">
                  See our GitHub work <ArrowUpRight className="size-4" />
                </a>
              </div>
            </article>
            </BorderGlow>
          </div>
        </section>
        </BorderGlow>

        <BorderGlow
          backgroundColor="transparent"
          borderRadius={32}
          glowColor="42 80 65"
          colors={["#fbbf24", "#22d3ee", "#34d399"]}
        >
        <section className="px-6 py-10 sm:px-10 sm:py-14">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-amber-300">Projects worth studying</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Good ideas get better in public.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              A few open-source projects we use, learn from, and point to when
              someone asks what community-built software can become.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Linux", "The kernel that powers a huge part of the internet.", "Systems", "https://github.com/torvalds/linux"],
              ["React", "A shared language for building ambitious interfaces.", "Frontend", "https://github.com/facebook/react"],
              ["VS Code", "An editor shaped by extensions, issues, and its community.", "Developer tools", "https://github.com/microsoft/vscode"],
              ["Kubernetes", "A new operating model for deploying software at scale.", "Cloud", "https://github.com/kubernetes/kubernetes"],
            ].map(([name, description, label, href]) => (
              <BorderGlow key={name} className="rounded-2xl" backgroundColor="transparent" borderRadius={20} glowColor="42 80 65" colors={["#fbbf24", "#22d3ee", "#34d399"]}>
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="my-target group rounded-2xl border border-white/10 bg-transparent p-5 backdrop-blur-sm transition-colors hover:border-amber-300/40"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">{label}</p>
                <h3 className="mt-4 text-xl font-semibold text-white">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors group-hover:text-amber-300">
                  View on GitHub <ArrowUpRight className="size-4" />
                </span>
              </a>
              </BorderGlow>
            ))}
          </div>
        </section>
        </BorderGlow>

        <BorderGlow
          backgroundColor="transparent"
          borderRadius={32}
          glowColor="155 70 60"
          colors={["#34d399", "#22d3ee", "#fbbf24"]}
        >
        <section className="px-6 py-10 sm:px-10 sm:py-14">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-300">
              Start small
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Your first pull request can be simple.
            </h2>
            <p className="mt-3 text-slate-300">
              Try one of these repositories when you are ready to practise. Read
              the contributing guide, choose one issue, and make the smallest
              useful change you can.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              [
                "First Contributions",
                "A friendly practice repo for learning the fork, branch, commit, and pull request workflow.",
                "Add your name or improve the guide",
                "https://github.com/firstcontributions/first-contributions",
              ],
              [
                "Public APIs",
                "A searchable list of public APIs where contributors can add, correct, or document useful entries.",
                "Add an API or fix its documentation",
                "https://github.com/public-apis/public-apis",
              ],
              [
                "The Algorithms - Python",
                "A collection of readable algorithms that is useful for practising code, tests, and clear explanations.",
                "Add an implementation or improve a test",
                "https://github.com/TheAlgorithms/Python",
              ],
              [
                "freeCodeCamp",
                "A large learning project with documentation, curriculum, and code tasks for contributors at many levels.",
                "Fix a typo or improve a lesson",
                "https://github.com/freeCodeCamp/freeCodeCamp",
              ],
            ].map(([name, description, firstTask, href]) => (
              <BorderGlow key={name} className="rounded-2xl" backgroundColor="transparent" borderRadius={20} glowColor="155 70 60" colors={["#34d399", "#22d3ee", "#fbbf24"]}>
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="my-target group flex flex-col justify-between gap-6 rounded-2xl border border-emerald-300/20 bg-transparent p-6 backdrop-blur-sm transition-colors hover:border-emerald-300/50"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold text-white">{name}</h3>
                    <ArrowUpRight className="size-5 shrink-0 text-emerald-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>
                </div>
                <p className="border-t border-white/10 pt-4 text-sm font-medium text-emerald-200">
                  Good first task: <span className="text-slate-200">{firstTask}</span>
                </p>
              </a>
              </BorderGlow>
            ))}
          </div>
        </section>
        </BorderGlow>
      </main>
    </div>
  )
}
