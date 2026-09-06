export type TeamLink = {
  label: string
  href: string
}

export type TeamMember = {
  id: string
  name: string
  role: string
  location: string
  tenure: string
  photo: string
  focus: string[]
  bio: string[]
  links: TeamLink[]
}
