import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose"

const memberSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["member", "admin"], default: "member" },
  },
  { timestamps: true }
)

export type MemberDoc = InferSchemaType<typeof memberSchema>

export const Member: Model<MemberDoc> =
  (mongoose.models.Member as Model<MemberDoc>) ??
  mongoose.model<MemberDoc>("Member", memberSchema)
