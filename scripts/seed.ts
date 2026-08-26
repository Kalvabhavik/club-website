import { config } from "dotenv"
import bcrypt from "bcryptjs"
import mongoose from "mongoose"

config({ path: [".env.local", ".env"] })

import { connectToDatabase } from "../lib/db"
import { EventModel } from "../lib/models/event"
import { Member } from "../lib/models/member"
import { events as seedEvents } from "../lib/events"

/**
 * Loads the initial member account and the seed events into MongoDB. Safe to
 * re-run: everything is upserted by its unique key.
 */
async function main() {
  await connectToDatabase()

  const username = (process.env.SEED_MEMBER_USERNAME ?? "os-code").toLowerCase()
  const password = process.env.SEED_MEMBER_PASSWORD

  if (!password) {
    throw new Error("SEED_MEMBER_PASSWORD is not set; add it to .env.local.")
  }

  await Member.updateOne(
    { username },
    {
      $set: {
        username,
        name: process.env.SEED_MEMBER_NAME ?? "OS Code Core Team",
        role: "admin",
        passwordHash: await bcrypt.hash(password, 10),
      },
    },
    { upsert: true }
  )

  for (const event of seedEvents) {
    await EventModel.updateOne(
      { slug: event.slug },
      { $set: event },
      { upsert: true }
    )
  }

  console.log(`Seeded member "${username}" and ${seedEvents.length} events.`)
  await mongoose.disconnect()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
