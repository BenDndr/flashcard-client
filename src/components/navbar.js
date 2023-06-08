'use client'
import Link from 'next/link'
import Image from "next/image";
import Logo from "../app/images/logo-nb2.png"
import { useSelector } from "react-redux";

const Navbar = () => {

  const store = useSelector(state => state);
  console.log("store", store)
  const {auth} = store

  return (
    <nav id="desktop-navbar">
      <div>
        <Link href="/">
          <Image
            src={Logo.src}
            width={50}
            height={50}
            alt="Logo Flashcard"
          />
        </Link>
      </div>
      <div className="nav-links">
      <Link href="/">
        <p className="nav-link">Home</p>
      </Link>
      <Link href="/about">
          <p className="nav-link">About</p>
      </Link>
      {
        auth.authState ?
        <Link href="/profile">
            <p className="nav-link">Profile</p>
        </Link>
       :
        <Link href="/login">
          <button className='button yellow-button'>
            Login
          </button>
        </Link>
      }
      {
        auth.authState &&
        <Link href="/folders">
          <button className='button yellow-button'>
            <p>Folders</p>
          </button>
        </Link>
      }
    </div>
  </nav>
  )
}

export default Navbar
