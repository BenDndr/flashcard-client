'use client'
import Link from 'next/link'
import { useSelector } from "react-redux";

export default function Home() {
  const store = useSelector(state => state);
  const {auth} = store

  return (
    <div>
      <header id="header">
        <h1>FlashCard</h1>
        <p>Learn faster, remember better</p>

          {auth.authState ?
            <Link href="/folders">
            <button className="button yellow-button">My Folders</button>
          </Link>
          :
            <Link href="/login">
              <button className="button yellow-button">Login</button>
            </Link>
          }
      </header>
      <ul>
      </ul>
    </div>
  )
}
