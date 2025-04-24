import type { Metadata } from 'next'
import "../styles/globals.scss"

export const metadata: Metadata = {
  title: 'EchoBook',
  description: 'Log your reading progress',
  icons: {
    icon: '/books.svg'
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
