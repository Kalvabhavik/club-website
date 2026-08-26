import { NextResponse } from "next/server"

import { connectToDatabase } from "@/lib/db"
import { ResourceModel, type ResourceDoc } from "@/lib/models/resource"
import { slugify } from "@/lib/event-service"
import { requireSession } from "@/lib/session"

export async function GET() {
  await connectToDatabase()
  const resources = await ResourceModel.find()
    .sort({ createdAt: -1 })
    .lean<ResourceDoc[]>()
  return NextResponse.json({ resources })
}

export async function POST(request: Request) {
  try {
    await requireSession()

    const body = (await request.json().catch(() => null)) as Record<
      string,
      unknown
    > | null
    const title = typeof body?.title === "string" ? body.title.trim() : ""
    const url = typeof body?.url === "string" ? body.url.trim() : ""

    if (!title || !url) {
      return NextResponse.json(
        { error: "Title and url are required." },
        { status: 400 }
      )
    }

    await connectToDatabase()
    const resource = await ResourceModel.create({
      ...body,
      title,
      url,
      slug: slugify(title),
    })

    return NextResponse.json({ resource }, { status: 201 })
  } catch (error) {
    if (error instanceof Response) return error
    throw error
  }
}
