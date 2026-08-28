import { NextResponse } from "next/server"

import {
  EventInputError,
  deleteEvent,
  findEvent,
  parseEventInput,
  updateEvent,
} from "@/lib/event-service"
import { requireSession } from "@/lib/session"

type Context = { params: Promise<{ slug: string }> }

export async function GET(_request: Request, { params }: Context) {
  const { slug } = await params
  const event = await findEvent(slug)
  if (!event) {
    return NextResponse.json({ error: "Event not found." }, { status: 404 })
  }
  return NextResponse.json({ event })
}

export async function PUT(request: Request, { params }: Context) {
  try {
    await requireSession()
    const { slug } = await params
    const event = await updateEvent(slug, parseEventInput(await request.json()))
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 })
    }
    return NextResponse.json({ event })
  } catch (error) {
    if (error instanceof Response) return error
    if (error instanceof EventInputError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    throw error
  }
}

export async function DELETE(_request: Request, { params }: Context) {
  try {
    await requireSession()
    const { slug } = await params
    if (!(await deleteEvent(slug))) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 })
    }
    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof Response) return error
    throw error
  }
}
