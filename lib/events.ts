export type EventCategory =
  | "Workshop"
  | "Hackathon"
  | "Competition"
  | "Talk"
  | "Meetup"

export type RegistrationStatus = "open" | "soon" | "closed"

export type EventResource = {
  label: string
  href: string
  type: "slides" | "repo" | "video" | "article"
}

export type EventOrganizer = {
  name: string
  role: string
  github?: string
}

export type ClubEvent = {
  slug: string
  title: string
  subtitle?: string
  category: EventCategory
  /** ISO date, e.g. "2026-09-15" */
  date: string
  /** ISO datetime used for the countdown; falls back to midnight UTC on `date`. */
  startsAt?: string
  time: string
  venue: string
  mode: "online" | "offline" | "hybrid"
  summary: string
  description: string
  tags: string[]
  organizers: EventOrganizer[]
  /** Paths under /public, or remote URLs. Empty renders a gradient placeholder. */
  gallery: string[]
  resources: EventResource[]
  registrationStatus?: RegistrationStatus
  registerUrl?: string
  /** Seats available; combined with `registered` to render a fill bar. */
  capacity?: number
  registered?: number
  attendees?: number
  featured?: boolean
}


export const clubCalendarUrl = "https://calendar.google.com/"

export const events: ClubEvent[] = [
  {
    slug: "technovation-2026",
    title: "Technovation 2026",
    subtitle: "Annual Tech Fest",
    category: "Competition",
    date: "2026-09-15",
    startsAt: "2026-09-15T10:00:00+05:30",
    time: "10:00 AM",
    venue: "Auditorium, IIIT Dharwad",
    mode: "offline",
    summary:
      "Our annual tech fest: competitions, project showcases and an open source track that runs all day.",
    description:
      "Technovation is the club's annual tech fest. The day mixes competitive tracks with an open source showcase where members demo what they have shipped over the year, plus lightning talks from alumni and a hiring corner for internships.",
    tags: ["tech fest", "showcase", "competition"],
    organizers: [
      { name: "OS Code Core Team", role: "Organizer", github: "os-code-iiitdwd" },
    ],
    gallery: [],
    resources: [],
    registrationStatus: "open",
    registerUrl: "https://forms.gle/",
    capacity: 400,
    registered: 328,
    featured: true,
  },
  {
    slug: "open-source-onboarding-2026",
    title: "Open Source Onboarding",
    category: "Workshop",
    date: "2026-09-26",
    startsAt: "2026-09-26T17:00:00+05:30",
    time: "5:00 PM - 7:00 PM",
    venue: "Lab 2, Academic Block",
    mode: "hybrid",
    summary:
      "Git, GitHub and your first pull request - a hands-on session for absolute beginners.",
    description:
      "A hands-on workshop that takes you from installing Git to getting a pull request merged. We cover branching, commits, forks, review etiquette and how to find a good first issue in a real project. Bring a laptop; we finish the session with everyone having opened at least one PR.",
    tags: ["git", "github", "beginner"],
    organizers: [
      { name: "OS Code Core Team", role: "Organizer", github: "os-code-iiitdwd" },
    ],
    gallery: [],
    resources: [],
    registrationStatus: "open",
    registerUrl: "https://forms.gle/",
    capacity: 80,
    registered: 41,
  },
  {
    slug: "hacktoberfest-kickoff-2026",
    title: "Hacktoberfest Kickoff",
    category: "Hackathon",
    date: "2026-10-03",
    startsAt: "2026-10-03T18:00:00+05:30",
    time: "6:00 PM - 8:00 PM",
    venue: "Seminar Hall",
    mode: "offline",
    summary:
      "Pick a project, pair up with a mentor and land four quality pull requests in October.",
    description:
      "The kickoff meetup for Hacktoberfest. We explain the rules, curate a board of beginner-friendly issues across the projects our members maintain, and pair every attendee with a mentor for the month. The evening ends with a live triage of open issues.",
    tags: ["hacktoberfest", "community", "mentoring"],
    organizers: [{ name: "OS Code Core Team", role: "Organizer" }],
    gallery: [],
    resources: [],
    registrationStatus: "soon",
    capacity: 150,
    registered: 0,
  },
  {
    slug: "tech-talk-scaling-open-source-2026",
    title: "Tech Talk: Scaling Open Source",
    category: "Talk",
    date: "2026-10-24",
    startsAt: "2026-10-24T19:00:00+05:30",
    time: "7:00 PM - 8:30 PM",
    venue: "Online (Google Meet)",
    mode: "online",
    summary:
      "An alumni-led talk on maintaining a project once it outgrows a single contributor.",
    description:
      "What changes when a side project starts receiving hundreds of issues a month? This alumni-led talk covers governance, triage automation, release trains, and the human side of saying no to contributions without discouraging contributors.",
    tags: ["maintainership", "community", "alumni"],
    organizers: [{ name: "OS Code Core Team", role: "Host" }],
    gallery: [],
    resources: [],
    registrationStatus: "open",
    registerUrl: "https://forms.gle/",
  },
  {
    slug: "annual-hackathon-2026",
    title: "Annual Hackathon 2026",
    category: "Hackathon",
    date: "2026-04-18",
    time: "9:00 AM - 9:00 PM",
    venue: "Central Lecture Hall, IIIT Dharwad",
    mode: "offline",
    summary:
      "Our flagship 24-hour build sprint where teams ship an open source project end to end.",
    description:
      "The Annual Hackathon is OS Code Club's biggest event of the year. Teams of up to four spend 24 hours turning an idea into a working, publicly licensed project. Mentors from the club and alumni working in industry review progress every few hours, and the day closes with live demos judged on impact, code quality and how welcoming the repository is to new contributors.",
    tags: ["24-hour", "teams", "demo day"],
    organizers: [
      { name: "OS Code Core Team", role: "Organizer", github: "os-code-iiitdwd" },
    ],
    gallery: [],
    resources: [
      { label: "Winning projects", href: "https://github.com/", type: "repo" },
    ],
    attendees: 210,
  },
  {
    slug: "intro-to-rust-2026",
    title: "Intro to Rust",
    category: "Workshop",
    date: "2026-03-14",
    time: "4:00 PM - 6:30 PM",
    venue: "Lab 3, Academic Block",
    mode: "offline",
    summary:
      "Ownership, borrowing and building a small CLI tool in Rust from scratch.",
    description:
      "A practical introduction to Rust for people who already know one systems or scripting language. We walk through ownership and borrowing, the type system, error handling with Result, and then build and publish a small command line tool together.",
    tags: ["rust", "systems", "cli"],
    organizers: [{ name: "OS Code Core Team", role: "Organizer" }],
    gallery: [],
    resources: [
      { label: "Workshop repository", href: "https://github.com/", type: "repo" },
    ],
    attendees: 64,
  },
  {
    slug: "linux-install-fest-2025",
    title: "Linux Install Fest",
    category: "Workshop",
    date: "2025-11-15",
    time: "10:00 AM - 4:00 PM",
    venue: "Lab 1, Academic Block",
    mode: "offline",
    summary:
      "Bring a laptop, leave with a working Linux dual boot and a configured dev environment.",
    description:
      "An all-day clinic where volunteers help attendees install a Linux distribution alongside their existing OS and set up a complete development environment: shell, editor, toolchains and dotfiles under version control.",
    tags: ["linux", "setup", "beginner"],
    organizers: [{ name: "OS Code Core Team", role: "Organizer" }],
    gallery: [],
    resources: [
      { label: "Setup checklist", href: "https://github.com/", type: "article" },
    ],
    attendees: 95,
  },
  {
    slug: "gsoc-prep-sprint-2025",
    title: "GSoC Prep Sprint",
    category: "Meetup",
    date: "2025-10-04",
    time: "5:30 PM - 8:00 PM",
    venue: "Seminar Hall",
    mode: "hybrid",
    summary:
      "Shortlisting organisations, reading codebases and writing a proposal that gets read.",
    description:
      "A working session for anyone planning to apply to Google Summer of Code. We go through picking organisations that match your skills, how to read an unfamiliar codebase quickly, how to engage on mailing lists, and we review draft proposals in small groups.",
    tags: ["gsoc", "proposals", "mentoring"],
    organizers: [{ name: "OS Code Core Team", role: "Organizer" }],
    gallery: [],
    resources: [
      { label: "Proposal template", href: "https://github.com/", type: "article" },
    ],
    attendees: 70,
  },
]

export const eventCategories: EventCategory[] = [
  "Workshop",
  "Hackathon",
  "Competition",
  "Talk",
  "Meetup",
]

function startOfToday(): number {
  const now = new Date()
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
}

function timestamp(event: ClubEvent): number {
  return new Date(`${event.date}T00:00:00Z`).getTime()
}

export function getEventStart(event: ClubEvent): string {
  return event.startsAt ?? `${event.date}T00:00:00Z`
}

export function getUpcomingEvents(list: ClubEvent[] = events): ClubEvent[] {
  const today = startOfToday()
  return list
    .filter((event) => timestamp(event) >= today)
    .sort((a, b) => timestamp(a) - timestamp(b))
}

export function getPastEvents(list: ClubEvent[] = events): ClubEvent[] {
  const today = startOfToday()
  return list
    .filter((event) => timestamp(event) < today)
    .sort((a, b) => timestamp(b) - timestamp(a))
}

export function getFeaturedUpcomingEvent(
  list: ClubEvent[] = events
): ClubEvent | undefined {
  const upcoming = getUpcomingEvents(list)
  return upcoming.find((event) => event.featured) ?? upcoming[0]
}

export function getFeaturedPastEvent(
  list: ClubEvent[] = events
): ClubEvent | undefined {
  const past = getPastEvents(list)
  return past.find((event) => event.featured) ?? past[0]
}

export function getEventBySlug(
  slug: string,
  list: ClubEvent[] = events
): ClubEvent | undefined {
  return list.find((event) => event.slug === slug)
}

export function getEventYears(list: ClubEvent[]): string[] {
  return Array.from(new Set(list.map((event) => event.date.slice(0, 4)))).sort(
    (a, b) => Number(b) - Number(a)
  )
}

export type PastEventStats = {
  eventsHosted: number
  peopleReached: string
  resourcesPublished: number
}

export function getPastEventStats(list: ClubEvent[] = events): PastEventStats {
  const past = getPastEvents(list)
  const attendees = past.reduce((total, event) => total + (event.attendees ?? 0), 0)
  return {
    eventsHosted: past.length,
    peopleReached:
      attendees >= 100 ? `${Math.floor(attendees / 100) * 100}+` : `${attendees}`,
    resourcesPublished: past.reduce(
      (total, event) => total + event.resources.length,
      0
    ),
  }
}

export function formatEventDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function formatEventDayMonth(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  })
}

export function formatEventMonth(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}
