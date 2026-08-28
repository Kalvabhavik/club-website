import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose"

const resourceSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    /** Link to the resource itself (repo, doc, form, drive folder). */
    url: { type: String, required: true },
    /** Optional cover image link. */
    imageUrl: String,
    category: {
      type: String,
      enum: ["guide", "roadmap", "recording", "repo", "toolkit"],
      default: "guide",
    },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
)

export type ResourceDoc = InferSchemaType<typeof resourceSchema>

export const ResourceModel: Model<ResourceDoc> =
  (mongoose.models.Resource as Model<ResourceDoc>) ??
  mongoose.model<ResourceDoc>("Resource", resourceSchema)
