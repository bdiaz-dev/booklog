import type { Metadata } from 'next'
import "../styles/globals.scss"

export const metadata: Metadata = {
  title: 'BookLog',
  description: 'Log your reading progress',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
