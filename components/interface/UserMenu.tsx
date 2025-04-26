'use client'

import Link from "next/link"
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import DeployBox from './DeployBox'

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
    <div className='deploy-box-container'>
      <img
        className='user-avatar'
        onClick={() => { setIsMenuOpen(!isMenuOpen) }}
        src={session.user.image}
        alt="user avatar"
      />
      <AnimatePresence>
        {isMenuOpen &&
          <DeployBox>
            <span className='user-menu-name'>{session.user.name}</span>
            <Link href="/api/auth/signout" className="button secondary">
              Cerrar Sesión
            </Link>
          </DeployBox>}
      </AnimatePresence>
    </div>
  )
}
