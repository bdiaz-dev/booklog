import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="home-page">
        <h1>Bienvenido al Registro de Lectura</h1>
        <div className="button-container">
          <Link href="/api/auth/signin" className="button primary">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  const userId = session.user.id
  const readBooks = await prisma.book.count({ where: { userId, isRead: true } })
  const unreadBooks = await prisma.book.count({ where: { userId, isRead: false } })

  return (
    <div className="home-page">
      <h1>Registro de Lectura</h1>
      <div className="button-container">
        <Link href="/reading-list" className="button primary">
          Lista de Lectura
          <span className="book-count">{unreadBooks} libros</span>
        </Link>
        <Link href="/read-books" className="button secondary">
          Libros Leídos
          <span className="book-count">{readBooks} libros</span>
        </Link>
        {/* <Link href="/add-book" className="button primary">
          Añadir Nuevo Libro
        </Link> */}
        <Link href="/api/auth/signout" className="button secondary">
          Cerrar Sesión
        </Link>
      </div>
    </div>
  )
}
