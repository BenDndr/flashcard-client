'use client'
import Link from 'next/link'
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHouse, faFolderOpen, faRightToBracket, faCircleUser, faQuoteRight} from '@fortawesome/free-solid-svg-icons'

const Tabbar = () => {

  const store = useSelector(state => state);
  const {auth} = store

  return (
    <nav id="smartphone-navbar">
      <Link href="/">
        <div className="tab-item">
          <FontAwesomeIcon icon={faHouse} />
          <p>Home</p>
        </div>
      </Link>
      {
        auth.authState &&
        <Link href="/folders">
          <div className="tab-item">
            <FontAwesomeIcon icon={faFolderOpen} />
            <p>My folders</p>
          </div>
        </Link>
      }
      {
        auth.authState ?
        <Link href="/profile">
          <div className="tab-item">
            <FontAwesomeIcon icon={faCircleUser} />
            <p>Profile</p>
          </div>
        </Link>
       :
       <Link href="/login">
          <div className="tab-item">
            <FontAwesomeIcon icon={faRightToBracket} />
            <p>Login</p>
          </div>
        </Link>
      }
      <Link href="/about">
        <div className="tab-item">
          <FontAwesomeIcon icon={faQuoteRight} />
          <p>About</p>
        </div>
      </Link>
    </nav>
  )
}

export default Tabbar
