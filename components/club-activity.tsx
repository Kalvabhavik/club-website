import { ArrowUpRight, Check, CircleCheck, GitBranch, GitCommit, GitPullRequest, MessageCircle, Minus, Plus } from "lucide-react"

const diffLines = [
  { type: "context", text: "let emitter = new SyntheticStreamDirect(socket_addr?);" },
  { type: "removed", text: "let map_init_pool = ThreadPool::spawn_with_capacity(DEFAULT_LIMIT);" },
  { type: "added", text: "let map_init_pool = ThreadPool::new(DEFAULT_LIMIT);" },
  { type: "added", text: "emitter.register_healthcheck(PROBE_PORT).await?;" },
]

const activityBars = [
  "bg-cyan-300", "bg-slate-600", "bg-cyan-400", "bg-slate-700", "bg-cyan-300",
  "bg-cyan-500", "bg-slate-600", "bg-cyan-400", "bg-cyan-300", "bg-emerald-300",
]

const contributors = [
  { name: "core maintainers", value: "42 commits", color: "bg-cyan-300" },
  { name: "new contributors", value: "18 commits", color: "bg-sky-400" },
  { name: "community fixes", value: "11 commits", color: "bg-emerald-300" },
]

export function ClubActivity({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "w-full" : "mx-auto w-full max-w-5xl space-y-8 border-t border-white/10 py-14 sm:py-20"}>
      {!compact ? <div className="max-w-2xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
          How we build
        </p>
        <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
          Small commits. Real momentum.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
          Every review, fix, and first contribution helps the club turn shared curiosity into useful open source.
        </p>
      </div> : null}

      <div className="overflow-hidden rounded-[1.35rem] border border-cyan-300/25 bg-[#09121d]/95 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-500 hover:border-cyan-200/45 hover:shadow-[0_28px_90px_rgba(8,145,178,0.14)]">
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0d1824] px-4 py-3 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            {compact ? <GitPullRequest className="size-4 shrink-0 text-emerald-300" /> : <div className="flex gap-1.5" aria-hidden="true">
              <span className="size-2 rounded-full bg-rose-400/90" />
              <span className="size-2 rounded-full bg-amber-300/90" />
              <span className="size-2 rounded-full bg-emerald-300/90" />
            </div>}
            <span className="truncate font-mono text-[10px] text-slate-400 sm:text-xs">
              {compact ? "OSCode-IIITDWD / hyve-mobile" : "github.com/os-code-club/telemetry-service"}
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 font-mono text-[10px] text-emerald-200">
            {compact ? <GitPullRequest className="size-3" /> : null}
            {compact ? "Open" : "PR #42 OPEN"}
          </span>
        </div>

        <div className={compact ? "grid gap-8 p-4 sm:p-5" : "grid gap-8 p-4 sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12"}>
          <div className={compact ? "hidden" : "space-y-5"}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="max-w-xl text-lg font-semibold leading-snug text-white sm:text-2xl">
                  feat(kernel): integrate distributed telemetry engine
                </h3>
                <p className="mt-2 font-mono text-[10px] text-slate-500">
                  @kartik-kun wants to merge 3 commits into main from feature/telemetry-sync
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-medium text-emerald-200">
                <Check className="size-3" /> All 14 checks passed
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-white/10 py-3 font-mono text-[10px] text-slate-500">
              <span className="inline-flex items-center gap-1.5 text-cyan-200"><GitPullRequest className="size-3.5" />3 files changed</span>
              <span className="text-emerald-300">+142 additions</span>
              <span className="text-rose-300">-16 deletions</span>
              <span className="ml-auto inline-flex items-center gap-1.5"><GitCommit className="size-3.5" />SHA: 8e31ab</span>
            </div>

            <div className="overflow-hidden rounded-lg border border-white/10 bg-[#070d15] font-mono text-[10px] leading-6 sm:text-xs">
              <div className="flex border-b border-white/10 bg-white/[0.03] px-3 py-2 text-slate-500">
                telemetry/stream/src/health.rs:12:18-41
              </div>
              {diffLines.map((line, index) => (
                <div key={line.text} className={`flex gap-3 px-3 ${line.type === "added" ? "bg-emerald-400/10 text-emerald-200" : line.type === "removed" ? "bg-rose-400/10 text-rose-200" : "text-slate-400"}`}>
                  <span className="w-4 shrink-0 select-none text-right text-slate-600">{index + 26}</span>
                  <span className="w-3 shrink-0 select-none text-center">{line.type === "added" ? <Plus className="mt-1 size-3" /> : line.type === "removed" ? <Minus className="mt-1 size-3" /> : " "}</span>
                  <span className="truncate">{line.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={compact ? "flex flex-col justify-between gap-8" : "flex flex-col justify-between gap-8 rounded-xl border border-white/10 bg-[#07101a] p-4 sm:p-5"}>
            {compact ? (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                        <GitPullRequest className="size-3.5 text-emerald-300" />
                        <span>pull request #42 · opened today</span>
                    </div>
                      <p className="mt-2 text-sm font-semibold leading-snug text-white">fix: show retry feedback on mobile sync</p>
                      <p className="mt-2 text-[10px] leading-relaxed text-slate-500"><span className="text-slate-300">@oscode-contributor</span> wants to merge 1 commit into <span className="font-mono text-slate-300">main</span> from <span className="font-mono text-cyan-200">fix/retry-feedback</span></p>
                  </div>
                    <span className="shrink-0 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-2 py-1 font-mono text-[9px] text-emerald-200">Open</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-cyan-300/15 px-2 py-1 text-[9px] text-cyan-200">enhancement</span>
                    <span className="rounded-full bg-violet-300/15 px-2 py-1 text-[9px] text-violet-200">mobile</span>
                    <span className="rounded-full bg-slate-300/10 px-2 py-1 text-[9px] text-slate-300">1 commit</span>
                </div>

                  <div className="flex gap-4 border-b border-white/10 font-mono text-[9px] text-slate-500">
                    <span className="border-b border-cyan-300 pb-2 text-slate-200">Conversation 3</span>
                    <span className="pb-2">Commits 1</span>
                    <span className="pb-2">Checks 14</span>
                  </div>

                <div className="rounded-lg border border-white/10 bg-[#07101a] p-3">
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <MessageCircle className="size-3.5 text-sky-300" />
                    <span className="font-medium text-slate-300">maintainer note</span>
                    <span>· 2 days ago</span>
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-slate-400">Show a useful state while the request retries, then add a small test for the failure path.</p>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-3 text-[10px]">
                  <p className="font-mono uppercase tracking-wider text-slate-500">Acceptance checklist</p>
                  <p className="flex items-center gap-2 text-emerald-200"><Check className="size-3.5" /> Loading state has a clear message</p>
                  <p className="flex items-center gap-2 text-emerald-200"><Check className="size-3.5" /> Retry action is keyboard accessible</p>
                  <p className="flex items-center gap-2 text-slate-400"><span className="size-3.5 rounded-full border border-slate-600" /> Add a regression test</p>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[9px] text-slate-500">
                  <a href="https://github.com/OSCode-IIITDWD/hyve-mobile/blob/main/doc/CONTRIBUTING.md" target="_blank" rel="noreferrer" className="my-target inline-flex items-center gap-1.5 transition-colors hover:text-cyan-200">
                    Pick this issue <ArrowUpRight className="size-3" />
                  </a>
                  <span className="inline-flex items-center gap-1.5 text-emerald-200"><GitPullRequest className="size-3.5" /> PR in progress</span>
                </div>
              </div>
            ) : (
              <>
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-slate-200">Contribution activity</p>
                  <p className="mt-1 font-mono text-[10px] text-slate-500">OS Code Club · last 90 days</p>
                </div>
                <GitBranch className="size-4 text-cyan-300" />
              </div>
              <div className="mb-3 flex items-end justify-between font-mono text-[10px]">
                <span className="text-slate-500">Commit velocity</span>
                <span className="text-cyan-300">96.4% build success</span>
              </div>
              <div className="space-y-2 rounded-lg border border-white/10 bg-[#050a11] p-2">
                {activityBars.map((color, index) => (
                  <div key={`${color}-${index}`} className="h-2.5 overflow-hidden rounded-sm bg-slate-800">
                    <div className={`h-full w-full ${color} opacity-90 shadow-[0_0_12px_currentColor]`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-5">
              {contributors.map((contributor) => (
                <div key={contributor.name} className="flex items-center gap-3">
                  <span className={`size-2 rounded-full ${contributor.color}`} />
                  <span className="flex-1 text-xs text-slate-400">{contributor.name}</span>
                  <span className="font-mono text-[10px] text-slate-500">{contributor.value}</span>
                </div>
              ))}
            </div>
              </>
            )}
          </div>
        </div>

        <div className="border-t border-white/10 bg-[#07101a] px-4 py-4 sm:px-6">
          <p className="font-mono text-[10px] text-slate-500">Review the work. Ask better questions. Ship together.</p>
        </div>
      </div>
    </section>
  )
}
