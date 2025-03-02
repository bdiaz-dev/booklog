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
    await prisma.book.delete({
      where: { googleId: bookId },
    })
    return NextResponse.json({ message: "Book removed" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove book" }, { status: 500 })
  }
}
