import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

import { connectToDatabase } from "@/lib/db"
import { Member } from "@/lib/models/member"
import { createSession } from "@/lib/session"

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    username?: unknown
    password?: unknown
  } | null

  const username =
    typeof body?.username === "string" ? body.username.trim() : ""
  const password = typeof body?.password === "string" ? body.password : ""

  if (!username || !password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 }
    )
  }

  await connectToDatabase()
  const member = await Member.findOne({ username: username.toLowerCase() })

  if (!member) {
    return NextResponse.json(
      { error: "This username is not an OS Code member account." },
      { status: 401 }
    )
  }

  if (!(await bcrypt.compare(password, member.passwordHash))) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 })
  }

  await createSession({
    memberId: String(member._id),
    username: member.username,
    name: member.name,
    role: member.role ?? "member",
  })

  return NextResponse.json({
    member: { username: member.username, name: member.name, role: member.role },
  })
}
