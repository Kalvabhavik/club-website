"use client"

import * as React from "react"
import Link from "next/link"
import {
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
} from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
]

export function NavigationMenuDemo() {
  return (
    <div className="flex w-full justify-center">
      <NavigationMenu>
        <NavigationMenuList className="flex w-full flex-wrap items-center justify-center gap-1">
          <NavigationMenuItem>
            <Link href="/" className="flex items-center">
              <img
                src={"favicon.ico"}
                alt="Logo"
                className="my-target mr-1 h-12 w-auto object-contain sm:mr-2 sm:h-16 lg:mr-4 lg:h-20"
              />
            </Link>
          </NavigationMenuItem>
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-blue-900/20 px-3 py-2 sm:px-5 sm:py-3 lg:px-9 lg:py-4">
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/" className="my-target">About</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem className="hidden sm:flex">
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/members" className="my-target">Members</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/events" className="my-target">Events</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/resources" className="my-target">Projects</Link>}
              />
            </NavigationMenuItem>
            <NavigationMenuItem>
              
            </NavigationMenuItem>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link href={href}>
            <div className="flex flex-col gap-2 text-xl">
              <div className="leading-none font-stretch-extra-expanded">
                {title}
              </div>
              <div className="line-clamp-2 text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  )
}
