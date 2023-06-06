'use client'
import Link from 'next/link'
import Image from 'next/image'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquareCaretDown} from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {

  const store = useSelector(state => state);
  console.log("store", store)
  const {auth} = store
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    axios.delete('http://localhost:8080/logout', { withCredentials: true })
    .then(res => {
      console.log("Logout Res", res)
      dispatch(logout())
      router.push('/')
    })
    .catch(err => console.log("Logout Err", err))
  }


  return (
    <nav id="desktop-navbar">
      <div>
        <Link href="/"><FontAwesomeIcon icon={faSquareCaretDown} /></Link>
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
