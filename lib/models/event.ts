import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose"

import { eventCategories } from "@/lib/events"

const organizerSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    github: String,
  },
  { _id: false }
)

const resourceSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, required: true },
    type: {
      type: String,
      enum: ["slides", "repo", "video", "article"],
      default: "article",
    },
  },
  { _id: false }
)

const eventSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: { type: String, required: true },
    subtitle: String,
    category: { type: String, enum: eventCategories, required: true },
    /** ISO date, e.g. "2026-09-15". Kept as a string so day-level filtering stays timezone-free. */
    date: { type: String, required: true },
    /** ISO datetime powering the countdown. */
    startsAt: String,
    time: { type: String, default: "" },
    venue: { type: String, default: "" },
    mode: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      default: "offline",
    },
    summary: { type: String, default: "" },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] },
    organizers: { type: [organizerSchema], default: [] },
    /** Image links: paths under /public or remote URLs. */
    gallery: { type: [String], default: [] },
    resources: { type: [resourceSchema], default: [] },
    registrationStatus: { type: String, enum: ["open", "soon", "closed"] },
    /** Registration form link (Google Form, Unstop, etc.). */
    registerUrl: String,
    capacity: Number,
    registered: Number,
    attendees: Number,
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

eventSchema.index({ date: -1 })

export type EventDoc = InferSchemaType<typeof eventSchema>

export const EventModel: Model<EventDoc> =
  (mongoose.models.Event as Model<EventDoc>) ??
  mongoose.model<EventDoc>("Event", eventSchema)
