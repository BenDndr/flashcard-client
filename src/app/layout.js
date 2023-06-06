import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar'
import Tabbar from '@/components/tabbar'
import Footer from '@/components/footer'
import {Providers} from '../store/provider.js'
import "../styles/index.scss"
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flashcard',
  description: 'Create your flashcards to learn faster',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <Providers>
            <Navbar />
            <main id="main-container">
              {children}
            </main>
            <Footer/>
            <Tabbar />
          </Providers>
      </body>
    </html>
  )
}
