import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { notFound } from "next/navigation"
import MoltenMetal from '@/components/MoltenMetal';

import { NavigationMenuDemo } from "@/components/navigation"
import TargetCursorWrapper from "@/components/TargetCursorWrapper"
import { members } from "@/lib/members"

export function generateStaticParams() {
  return members.map((member) => ({ username: member.username }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const member = members.find((item) => item.username === username)

  return {
    title: member ? `${member.name} | OS Code IIIT Dharwad` : "Member not found | OS Code IIIT Dharwad",
    description: member?.bio ?? "OS Code member profile",
    icons: { icon: "/oscode.ico" },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const member = members.find((item) => item.username === username)
  if (!member) notFound()

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
          grain={true}
          grainIntensity={0.05}
          mouseInteraction={true}
          mouseStrength={0.3}
          opacity={1.0}
        />
      </div>
      <div className="pointer-events-none fixed -z-10 h-full w-full">
        <div className="h-full w-full bg-[radial-gradient(circle_at_80%_15%,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_15%_85%,rgba(16,185,129,0.14),transparent_30%)]" />
      </div>
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-6 sm:px-6 lg:px-8">
        <NavigationMenuDemo />
        <TargetCursorWrapper />

        <Link href="/members" className="my-target inline-flex w-fit items-center gap-2 text-sm text-slate-300 transition-colors hover:text-white">
          <ArrowLeft className="size-4" />
          Back to members
        </Link>

        <article className="grid overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/60 shadow-2xl shadow-cyan-950/20 backdrop-blur-sm lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative min-h-[28rem] lg:min-h-[42rem]">
            <Image
              src={member.image || "/members/rd.webp"}
              alt={`Portrait of ${member.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-12 lg:p-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {member.role}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {member.name}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              {member.bio}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {member.domains.map((domain) => (
                <span key={domain} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
                  {domain}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3 border-t border-white/10 pt-8">
              {member.github ? (
                <a href={`https://github.com/${member.github}`} target="_blank" rel="noreferrer" className="my-target inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-200">
                  GitHub <ArrowUpRight className="size-4" />
                </a>
              ) : null}
              {member.linkedin ? (
                <a href={member.linkedin} target="_blank" rel="noreferrer" className="my-target inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-cyan-300 hover:text-cyan-200">
                  LinkedIn <ArrowUpRight className="size-4" />
                </a>
              ) : null}
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}