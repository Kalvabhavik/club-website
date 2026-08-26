import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

export const SESSION_COOKIE = "oscode_session"

const MAX_AGE_SECONDS = 60 * 60 * 24 * 7

export type SessionPayload = {
  memberId: string
  username: string
  name: string
  role: string
}

function secret(): Uint8Array {
  const value = process.env.SESSION_SECRET
  if (!value) {
    throw new Error(
      "SESSION_SECRET is not set. Copy .env.example to .env.local."
    )
  }
  return new TextEncoder().encode(value)
}

export async function createSession(payload: SessionPayload): Promise<void> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secret())

  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  })
}

export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, secret())
    const { memberId, username, name, role } =
      payload as Partial<SessionPayload>
    if (!memberId || !username) return null
    return {
      memberId,
      username,
      name: name ?? username,
      role: role ?? "member",
    }
  } catch {
    return null
  }
}

/** Throws a 401-shaped response when the caller is not a signed-in member. */
export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession()
  if (!session) {
    throw new Response(JSON.stringify({ error: "Not signed in." }), {
      status: 401,
      headers: { "content-type": "application/json" },
    })
  }
  return session
}
