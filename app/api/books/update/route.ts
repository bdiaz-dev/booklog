import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const { bookId, feedback, readedDate } = await req.json()

  try {
    const book = await prisma.book.findFirst({
      where: {
        googleId: bookId,
        userId: session.user.id,
      },
    })

    if (!book) {
      return NextResponse.json({ ok: false, error: "Book not found" }, { status: 404 })
    }

    await prisma.book.update({
      where: { id: book.id },
      data: { readedDate, rating: feedback },
    })

    return NextResponse.json({ ok: true, message: "Book rating and read date updated" })
  } catch (error) {
    console.log("error", error)
    return NextResponse.json({ ok: false, error: "Failed to update book rating and read date" }, { status: 500 })
  }
}
