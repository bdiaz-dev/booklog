import Link from "next/link"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import "@/public/books.svg"
import UserListsContainer from '@/components/book-lists/UserListsContainer'
import UserMenu from '@/components/interface/UserMenu'

// discrimar acentos

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <div className="home-page start">
        <div className='title'>
          <img src="/books.svg" alt="title image" width={80} height={80} />
        <h1>EchoBook</h1>
        </div>
        <p>Registra aqui todos los libros que tienes pensado leer, y marca los que has leido.</p>
        <p>No vuelvas a olvidar nunca aquel libro que tenias pendiente de leer.</p>
        <br />
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
        <div className='header-title'>
          <img src={'/books.svg'} width={30} height={30} />
          <span>EchoBook</span>
        </div>
        <UserMenu session={session} />
        {/* <span>{session.user.name}</span> */}
        {/* <img src={session.user.image} width={35} height={35} alt="" />
        <Link href="/api/auth/signout" className="button secondary">
          Cerrar Sesión
        </Link> */}
      </header>
      <UserListsContainer readBooksCount={readBooks} readingBooksCount={unreadBooks} />

    </div>
  )
}
