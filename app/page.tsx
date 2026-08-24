import { NavigationMenuDemo } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import Head from "next/head"

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
    <div className="min-h-screen">
      <Head>
        <title>OS Code IIIT Dharwad</title>
        <meta name="description" content="OS Code IIIT Dharwad" />
        <link rel="icon" href="/oscode.ico" />
      </Head>
      <header className="w-full p-6">
        <NavigationMenuDemo />
      </header>
      <main className="p-6 col-6">
        {/* Page content goes here */}
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
        <Button>Hello</Button>
      </main>
    </div>
  )
}
