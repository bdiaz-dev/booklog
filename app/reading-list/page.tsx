import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import BookList from "@/components/BookList"
import Link from "next/link"
import ReturnHome from '@/components/buttons/returnHome'

export default async function ReadingList() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return <div>Acceso denegado</div>
  }

  const books = await prisma.book.findMany({
    where: { userId: session.user.id, isRead: false },
  })

  return (
    <div className="container">
      <ReturnHome />
      <h2>Lista de Lectura</h2>
      <Link href="/add-book" className="button primary">
        Añadir Nuevo Libro
      </Link>
      <BookList books={books} isReadingList={true} />
    </div>
  )
}
