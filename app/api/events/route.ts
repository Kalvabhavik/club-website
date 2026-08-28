import { NextResponse } from "next/server"

import {
  EventInputError,
  createEvent,
  listEvents,
  parseEventInput,
} from "@/lib/event-service"
import { requireSession } from "@/lib/session"

export async function GET() {
  return NextResponse.json({ events: await listEvents() })
}

export async function POST(request: Request) {
  try {
    await requireSession()
    const input = parseEventInput(await request.json())
    return NextResponse.json(
      { event: await createEvent(input) },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof Response) return error
    if (error instanceof EventInputError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    throw error
  }
}
