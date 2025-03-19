import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import "@/public/books.svg"
import Image from 'next/image'
import UserListsContainer from '@/components/UserListsContainer'

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
      <header className='header'>
      <span>Registro de Lectura</span>
        <Link href="/api/auth/signout" className="button secondary">
          Cerrar Sesión
        </Link>
      </header>
        <UserListsContainer readBooksCount={readBooks} readingBooksCount={unreadBooks}/>
        
    </div>
  )
}
