import { NavigationMenuDemo } from "@/components/navigation"
import { Button } from "@base-ui/react"

export const metadata = {
  title: "OS Code IIIT Dharwad",
  description: "OS Code IIIT Dharwad",
  icons: {
    icon: "/oscode.ico",
  },
}

export default function Page() {
  return (
    // <div className="flex min-h-svh p-6">
    //   <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
    //     <div>
    //       <h1 className="font-medium">Project ready!</h1>
    //       <p>You may now add components and start building.</p>
    //       <p>We&apos;ve already added the button component for you.</p>
    //       <Button className="mt-2">Button</Button>
    //     </div>
    //     <div className="font-mono text-xs text-muted-foreground">
    //       (Press <kbd>d</kbd> to toggle dark mode)
    //     </div>
    //   </div>
    // </div>
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <div className="w-full">
          <NavigationMenuDemo />
        </div>
        <div className="w-full">
          <button>Hello</button>
          {/* TODO: FAQ and Footer */}
        </div>
      </main>
    </div>
  )
}
