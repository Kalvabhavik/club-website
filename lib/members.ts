export type MemberRole = "Lead" | "Domain Lead" | "Contributor" | "Alumni" | "Core Team"

export type MemberDomain =
  | "Web"
  | "ML/AI"
  | "Systems"
  | "DevOps"
  | "Design"
  | "Community"

export type ClubMember = {
  username: string
  name: string
  role: MemberRole
  domains: MemberDomain[]
  bio: string
  year: string
  github?: string
  linkedin?: string
  featured?: boolean
  image?: string
}

export const memberRoles: MemberRole[] = [
  "Lead",
  "Core Team",
  "Contributor",
  "Alumni",
]

export const memberDomains: MemberDomain[] = [
  "Web",
  "ML/AI",
  "Systems",
  "DevOps",
  "Design",
  "Community",
]

export const members: ClubMember[] = [
  {
    username: "nituldas",
    name: "Nitul Das",
    role: "Lead",
    domains: ["Systems", "Community"],
    bio: "Keeps the club's projects, mentors and events moving in the same direction.",
    year: "2023",
    github: "rd6260",
    featured: true,
    image: "/members/rd.webp"
  },
  {
    username: "rishita",
    name: "Rishita",
    role: "Lead",
    domains: ["Web", "Design"],
    bio: "Owns the club's web presence and pairs with new members on their first PR.",
    year: "2023",
    github: "rishitha",
    featured: true,
    image: "/members/Rishita.webp"
  },
  {
    username: "Sufiyan",
    name: "Sufiyan",
    role: "Domain Lead",
    domains: ["DevOps"],
    bio: "Runs the ML reading group and mentors GSoC applicants every spring.",
    year: "2025",
    github: "kabirsingh",
        image: "/members/sufiyan.jpg"


  },
  {
    username: "ritikasharma",
    name: "Ritika Sharma",
    role: "Core Team",
    domains: ["DevOps"],
    bio: "Maintains the club's CI pipelines and self-hosted infra.",
    year: "2024",
    github: "ritikasharma",
  },
  {
    username: "arjunmenon",
    name: "Arjun Menon",
    role: "Core Team",
    domains: ["Systems"],
    bio: "Leads the Rust and systems programming workshops each semester.",
    year: "2024",
    github: "arjunmenon",
  },
  {
    username: "sanahassan",
    name: "Sana Hassan",
    role: "Contributor",
    domains: ["Design"],
    bio: "Designs event posters, the club's brand kit and workshop decks.",
    year: "2025",
    github: "sanahassan",
  },
  {
    username: "devpatil",
    name: "Dev Patil",
    role: "Contributor",
    domains: ["Web"],
    bio: "Shipping the events calendar and working through a first-timers-only board.",
    year: "2025",
    github: "devpatil",
  },
  {
    username: "priyaverma",
    name: "Priya Verma",
    role: "Contributor",
    domains: ["ML/AI"],
    bio: "Exploring model evaluation tooling; new to open source this year.",
    year: "2025",
    github: "priyaverma",
  },
  {
    username: "rohanjoshi",
    name: "Rohan Joshi",
    role: "Contributor",
    domains: ["Community"],
    bio: "Organises the weekly build nights and keeps the Discord welcoming.",
    year: "2025",
    github: "rohanjoshi",
  },
  {
    username: "nikhilbose",
    name: "Nikhil Bose",
    role: "Alumni",
    domains: ["Systems", "DevOps"],
    bio: "Founding member; now working in infrastructure, still reviews PRs.",
    year: "2021",
    github: "nikhilbose",
  },
  {
    username: "farahkhan",
    name: "Farah Khan",
    role: "Alumni",
    domains: ["Web", "Design"],
    bio: "Led the first redesign of the club site before graduating.",
    year: "2022",
    github: "farahkhan",
  },
]

export function getMemberStats(list: ClubMember[] = members) {
  return {
    total: list.length,
    core: list.filter((m) => m.role === "Lead" || m.role === "Core Team").length,
    domains: memberDomains.length,
  }
}
