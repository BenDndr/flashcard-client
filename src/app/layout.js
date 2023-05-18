import '../../public/style/globals.scss'
import '../../public/style/index.scss'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flashcard',
  description: 'Create your flashcards to learn faster',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href="/"><img className="nav-logo" src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"/></Link>
        </nav>
        <main id="main-container">
          {children}
        </main>
      </body>
    </html>
  )
}
