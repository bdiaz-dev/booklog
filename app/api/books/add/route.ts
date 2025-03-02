import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { title, author, googleId, thumbnail, addedDate } = await req.json()

  try {
    const book = await prisma.book.create({
      data: {
        title,
        author,
        googleId,
        thumbnail,
        userId: session.user.id,
      },
    })
    return NextResponse.json({ message: "Book added", book })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add book" }, { status: 500 })
  }
}
