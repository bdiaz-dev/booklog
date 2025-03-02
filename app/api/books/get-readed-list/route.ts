import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const userId = session.user.id;
    const readedList = await prisma.book.findMany({
      where: { userId, isRead: true },
      select: { googleId: true },
    });

    const bookIds = readedList.map(book => book.googleId);

    return NextResponse.json(bookIds)
  } catch (error) {
    return NextResponse.json({ error: "Failed to get readed list" }, { status: 500 })
  }
}
