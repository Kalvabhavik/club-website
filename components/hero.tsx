import Link from "next/link"
import { ArrowRight, CalendarDays, ExternalLink } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const stats = [
	{ label: "Active Members", value: "10+" },
	{ label: "Open Projects", value: "2" },
	{ label: "Annual Events", value: "4" },
]

export function Hero() {
	return (
		<section className="relative w-full overflow-hidden rounded-[2rem] px-6 py-12 text-white shadow-2xl shadow-slate-950/20 sm:px-10 sm:py-16 lg:px-14">
		{/* <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-linear-to-br from-slate-950 via-slate-900 to-cyan-900 px-6 py-12 text-white shadow-2xl shadow-slate-950/20 sm:px-10 sm:py-16 lg:px-14"> */}
			{/* <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" /> */}

			<div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
				<div className="min-w-0 space-y-7">
					<p className="inline-flex w-max items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs font-semibold tracking-[0.18em] uppercase">
						IIIT Dharwad
						<span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
						Open Source Club
					</p>

					<div className="space-y-5">
                        <h1 className="max-w-2xl text-pretty text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Contribute to real projects.
						</h1>
						<h1 className="max-w-2xl text-pretty text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
							Build in public.
						</h1>
						<p className="max-w-xl text-base text-slate-200 sm:text-lg">
							OS Code Club at IIIT Dharwad is a student-led community where
							students collaborate on impactful open source projects, mentor each other,
							and grow through contributions to global open source ecosystems.
						</p>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
						<Link
							href="/events"
							className={cn(
								buttonVariants({ size: "lg" }),
								"h-10 w-full rounded-full bg-cyan-300 px-5 text-slate-900 hover:bg-cyan-200 sm:w-auto"
							)}
						>
							Explore Events
							<CalendarDays className="size-4" />
						</Link>
						<Link
							href="/resources"
							className={cn(
								buttonVariants({ variant: "outline", size: "lg" }),
								"h-10 w-full rounded-full border-white/35 bg-transparent px-5 text-white hover:bg-white/10 hover:text-white sm:w-auto"
							)}
						>
							Start Contributing
							<ArrowRight className="size-4" />
						</Link>
					</div>
				</div>

				{/* <div className="min-w-0 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm sm:p-8">
					<p className="mb-5 text-sm font-medium tracking-wide text-cyan-100 uppercase">
						Weekly Rhythm
					</p>

					<div className="space-y-3 text-sm text-slate-100">
						<div className="flex flex-col gap-1 rounded-xl border border-white/15 bg-slate-900/45 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
							<span>Monday</span>
							<span className="min-w-0 wrap-break-word font-medium sm:text-right">Issue Triage + Mentoring</span>
						</div>
						<div className="flex flex-col gap-1 rounded-xl border border-white/15 bg-slate-900/45 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
							<span>Wednesday</span>
							<span className="min-w-0 wrap-break-word font-medium sm:text-right">Build Night</span>
						</div>
						<div className="flex flex-col gap-1 rounded-xl border border-white/15 bg-slate-900/45 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
							<span>Saturday</span>
							<span className="min-w-0 wrap-break-word font-medium sm:text-right">Demo Day</span>
						</div>
					</div>

					<Link
						href="https://github.com"
						target="_blank"
						rel="noreferrer"
						className={cn(
							buttonVariants({ size: "lg" }),
							"mt-6 flex h-10 w-full rounded-xl bg-white px-5 text-slate-900 hover:bg-slate-100"
						)}
					>
						View GitHub
						<ExternalLink className="size-4" />
					</Link>
				</div> */}
			</div>

			<div className="relative mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
				{stats.map((item) => (
					<div
						key={item.label}
						className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm"
					>
						<p className="text-3xl font-semibold tracking-tight">{item.value}</p>
						<p className="mt-1 text-sm text-slate-200">{item.label}</p>
					</div>
				))}
			</div>
		</section>
	)
}

