import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>FlashCard</h1>
      <ul>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/folders">Folders</Link>
        </li>
      </ul>
    </main>
  )
}
