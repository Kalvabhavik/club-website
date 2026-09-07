import { NextResponse } from "next/server"

import { requireSession } from "@/lib/session"

const MAX_FILE_SIZE = 10 * 1024 * 1024

function cleanFileName(name: string): string {
  const cleaned = name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-|-$/g, "")
  return cleaned || "image"
}

export async function POST(request: Request) {
  try {
    await requireSession()

    const token = process.env.GITHUB_TOKEN
    const owner = process.env.GITHUB_OWNER
    const repo = process.env.GITHUB_REPO
    const branch = process.env.GITHUB_BRANCH ?? "main"
    const uploadPath = process.env.GITHUB_UPLOAD_PATH ?? "gallery"

    if (!token || !owner || !repo) {
      return NextResponse.json(
        { error: "GitHub image upload is not configured on the server." },
        { status: 503 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file")
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Choose an image file first." }, { status: 400 })
    }
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image files can be uploaded." }, { status: 400 })
    }
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Images must be 10 MB or smaller." }, { status: 400 })
    }

    const fileName = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${cleanFileName(file.name)}`
    const path = `${uploadPath.replace(/^\/+|\/+$/g, "")}/${fileName}`
    const content = Buffer.from(await file.arrayBuffer()).toString("base64")
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": "2022-11-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Upload gallery image ${fileName}`,
          content,
          branch,
        }),
      }
    )

    if (!response.ok) {
      const details = (await response.json().catch(() => null)) as {
        message?: string
      } | null
      const message = details?.message ?? ""
      const error = message === "Git Repository is empty."
        ? "GitHub repository is empty. Add a README or first commit, then try the upload again."
        : response.status === 403
          ? "GitHub rejected the token. Give it repository Contents: Read and write permission, then restart the server."
          : message
            ? `GitHub upload failed: ${message}`
            : `GitHub upload failed with status ${response.status}.`
      return NextResponse.json(
        { error },
        { status: 502 }
      )
    }

    const result = (await response.json()) as {
      content?: { download_url?: string }
    }
    const url = result.content?.download_url
    if (!url) {
      return NextResponse.json({ error: "GitHub returned no image URL." }, { status: 502 })
    }

    return NextResponse.json({ url })
  } catch (error) {
    if (error instanceof Response) return error
    return NextResponse.json({ error: "Image upload failed." }, { status: 500 })
  }
}