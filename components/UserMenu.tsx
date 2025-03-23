'use client'

import Link from "next/link"
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface UserMenuProps {
  session: {
    user: {
      name: string,
      email: string,
      image: string,
      id: string,
    }
  }
}

export default function UserMenu({ session }: UserMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <>
      <img
        className='user-avatar'
        onClick={() => { setIsMenuOpen(!isMenuOpen) }}
        src={session.user.image}
        alt="user avatar"
      />
      <AnimatePresence>
        {isMenuOpen &&
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className='user-menu'
          >
            <span className='user-menu-name'>{session.user.name}</span>
            <Link href="/api/auth/signout" className="button secondary">
              Cerrar Sesión
            </Link>
          </motion.div>}
      </AnimatePresence>
    </>
  )
}
