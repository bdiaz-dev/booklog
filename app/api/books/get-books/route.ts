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
      where: { userId, AND: [{ isRead: true }]},
    });
    
    const readingList = await prisma.book.findMany({
      where: { userId, AND: [{ isRead: false }]},
    });
    
    const readedCount = await prisma.book.count({ where: { userId, isRead: true } })
    const readingCount = await prisma.book.count({ where: { userId, isRead: false } })

    // const bookIds = readedList.map(book => book.googleId);

    return NextResponse.json({ readedList, readingList, readedCount, readingCount })
  } catch (error) {
    return NextResponse.json({ error: "Failed to get user's books data" }, { status: 500 })
  }
}
