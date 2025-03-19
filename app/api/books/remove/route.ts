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
    // Primero, busca el libro con las condiciones dadas
    const book = await prisma.book.findFirst({
      where: {
        googleId: bookId,
        userId: session.user.id,
      },
    })

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    // Luego, usa el ID del libro encontrado para realizar la eliminación
    await prisma.book.delete({
      where: { id: book.id },
    })

    return NextResponse.json({ message: "Book removed" })
  } catch (error) {
    console.error("Failed to remove book:", error)
    return NextResponse.json({ error: "Failed to remove book" }, { status: 500 })
  }
}
