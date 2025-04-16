import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 })
  }

  const { bookId, startedDate } = await req.json()
  console.log("googleid", bookId, "fecha", startedDate, "usuario", session.user.id)

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
      data: { isStarted: true, startedDate },
    })

    return NextResponse.json({ ok: true, message: "Book started" })
  } catch (error) {
    console.log("error", error)
    return NextResponse.json({ ok: false, error: "Failed to mark book as started" }, { status: 500 })
  }
}
