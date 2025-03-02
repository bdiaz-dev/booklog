import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { bookId } = await req.json()

  try {
    await prisma.book.update({
      where: { id: bookId },
      data: { isRead: true, readedDate: new Date().toISOString() },
    })
    return NextResponse.json({ message: "Book marked as read" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to mark book as read" }, { status: 500 })
  }
}
