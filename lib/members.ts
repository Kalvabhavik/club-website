export type MemberRole = "Lead" | "Co-lead" | "Domain Lead"  | "Alumni" | "Core Team" | "Member"

export type MemberDomain =
  | "Core"
  | "Dev"
  | "CP/DSA"
  | "AI/ML"
  | "OpenSource team"
  | "Social Media team"
  | "DevOps"

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
  "Co-lead",
  "Domain Lead",
  "Core Team",
  
  "Alumni",
  "Member"
]

export const memberDomains: MemberDomain[] = [
  "Core",
  "Dev",
  "CP/DSA",
  "AI/ML",
  "OpenSource team",
  "Social Media team",
  "DevOps"
  
]

export const members: ClubMember[] = [
  {
    username: "nituldas",
    name: "Nitul Das",
    role: "Lead",
    domains: ["Dev","DevOps"],
    bio: "Keeps the club's projects, mentors and events moving in the same direction.",
    year: "2023",
    github: "rd6260",
    featured: true,
    image: "/members/rd.webp"
  },
  {
    username: "rishita",
    name: "Rishita",
    role: "Co-lead",
    domains: ["CP/DSA"],
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
    github: "sufiyan",
        image: "/members/sufiyan.jpg"


  },
  
  {
    username: "yash",
    name: "Yash",
    role: "Core Team",
    domains: ["Core"],
    bio: "Helps coordinate the club's core activities and member initiatives.",
    year: "2025",
    github: "yash",
    image: "/members/YASH.jpeg"
  },
  {
    username: "neeha-chaitra",
    name: "J. Neeha Chaitra",
    role: "Member",
    domains: ["Social Media team"],
    bio: "Manages social updates and helps organise the club's events.",
    year: "2025",
    github: "neeha-chaitra",
    image: "/members/JALADURGAM NEEHA CHAITRA.jpg"
  },
  {
    username: "utkarsh-gupta",
    name: "Utkarsh Gupta",
    role: "Member",
    domains: ["AI/ML"],
    bio: "Explores machine learning and contributes to the club's technical work.",
    year: "2025",
    github: "utkarsh-gupta",
    image: "/members/UTKARSH GUPTA.jpg"
  },
  {
    username: "kalva-bhavik",
    name: "Kalva Bhavik",
    role: "Member",
    domains: ["Dev"],
    bio: "Builds mobile experiences and experiments with practical app development.",
    year: "2025",
    github: "kalva-bhavik",
    image: "/members/KALVA BHAVIK.jpg"
  },
  {
    username: "apoorva",
    name: "Apoorva",
    role: "Member",
    domains: ["Dev"],
    bio: "Learns app development and contributes to collaborative club projects.",
    year: "2025",
    github: "apoorva",
    image: "/members/APOORVA S JADHAV.jpeg"
  },
  {
    username: "atharav-sethi",
    name: "Atharav Sethi",
    role: "Member",
    domains: ["Dev"],
    bio: "Works across web development and competitive programming with a focus on strong technical foundations.",
    year: "2025",
    github: "atharav-sethi",
    image: "/members/ATHARAV SETHI.jpeg"
  },
  {
    username: "aman-kumar",
    name: "Aman Kumar",
    role: "Member",
    domains: ["CP/DSA"],
    bio: "Contributes to AI and machine learning work while supporting technical club discussions.",
    year: "2025",
    github: "aman-kumar",
    image: "/members/AMAN KUMAR.webp"
  },
  {
    username: "kritika-kumari",
    name: "Kritika Kumari",
    role: "Domain Lead",
    domains: ["AI/ML"],
    bio: "Explores machine learning topics and shares practical ideas with the club.",
    year: "2025",
    github: "kritika-kumari",
    image: "/members/KRITIKA KUMARI.jpeg"
  },
  {
    username: "paritosh-ratan-katke",
    name: "Paritosh Ratan Katke",
    role: "Member",
    domains: ["CP/DSA"],
    bio: "Practises data structures and algorithms and contributes to club activities.",
    year: "2025",
    github: "paritosh-ratan-katke",
    image: "/members/PARITOSH RATAN KATKE.jpg"
  },
  {
    username: "md-kamraan-ajmal",
    name: "Md Kamraan Ajmal",
    role: "Domain Lead",
    domains: ["Dev"],
    bio: "Builds app development projects and learns through hands-on collaboration.",
    year: "2025",
    github: "md-kamraan-ajmal",
    image: "/members/MD KAMRAAN AJMAL.jpeg"
  },
  {
    username: "nagumalli-satwika",
    name: "Nagumalli Satwika",
    role: "Member",
    domains: ["Dev"],
    bio: "Learns and contributes to web development projects with the club.",
    year: "2025",
    github: "nagumalli-satwika",
    image: "/members/NAGUMALLI SATWIKA.jpg"
  },
  {
    username: "ayush-singh",
    name: "Ayush Singh",
    role: "Member",
    domains: ["AI/ML"],
    bio: "Explores AI and machine learning through club projects and discussions.",
    year: "2025",
    github: "ayush-singh",
    image: "/members/AYUSH SINGH.png"
  },
  {
    username: "ishita-nerpagar",
    name: "Ishita Sagar Nerpagar",
    role: "Member",
    domains: ["CP/DSA"],
    bio: "Builds problem-solving skills through data structures and algorithms.",
    year: "2025",
    github: "ishita-nerpagar",
    image: "/members/ISHITA SAGAR NERPAGAR.jpg"
  },
  
  {
    username: "ved-sudhakar",
    name: "Ved Sudhakar",
    role: "Member",
    domains: ["AI/ML"],
    bio: "Explores AI and machine learning through practical experiments.",
    year: "2025",
    github: "ved-sudhakar",
    image: "/members/VED SUDHAKAR CHANDORIKAR.jpg"
  },
  {
    username: "darsh-chouhan",
    name: "Darsh Chouhan",
    role: "Member",
    domains: ["AI/ML"],
    bio: "Learns machine learning and contributes to the club's technical community.",
    year: "2025",
    github: "darsh-chouhan",
    image: "/members/DARSH CHOUHAN.jpg"
  },
]

export function getMemberStats(list: ClubMember[] = members) {
  return {
    total: list.length,
    core: list.filter((m) => m.role === "Lead" || m.role === "Core Team").length,
    domains: memberDomains.length,
  }
}
