import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import "@/public/books.svg"
import UserListsContainer from '@/components/UserListsContainer'
import UserMenu from '@/components/UserMenu'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="home-page">
        <h1>Bienvenido a BookLog</h1>
        <div className="button-container">
          <Link href="/api/auth/signin" className="button primary">
            Iniciar Sesión
          </Link>
        </div>
      </div>
    )
  }

  // console.log(session)
  
  const userId = session.user.id
  const readBooks = await prisma.book.count({ where: { userId, isRead: true } })
  const unreadBooks = await prisma.book.count({ where: { userId, isRead: false } })

  return (
    <div className="home-page">
      <header className='header'>
      <span className='header-title'>Registro de Lectura</span>
      <UserMenu session={session} />
      {/* <span>{session.user.name}</span> */}
      {/* <img src={session.user.image} width={35} height={35} alt="" />
        <Link href="/api/auth/signout" className="button secondary">
          Cerrar Sesión
        </Link> */}
      </header>
        <UserListsContainer readBooksCount={readBooks} readingBooksCount={unreadBooks}/>
        
    </div>
  )
}
