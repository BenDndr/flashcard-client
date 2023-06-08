'use client'
import Link from 'next/link'
import { useSelector } from "react-redux";
import Image from "next/image";
import logoBlack from "./images/logo-nb2.png"
import LibraryPic from "./images/library.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolderOpen, faLayerGroup, faBrain} from '@fortawesome/free-solid-svg-icons'

export default function Home() {
  const store = useSelector(state => state);
  const {auth} = store

  return (
    <div>
      <header id="header" style={{backgroundImage: `url(${LibraryPic.src})`}}>

        <h1>FlashCard</h1>
        <p>Learn faster, increase your knowledge</p>

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

      <section className="home-container">
        <article className="mask">
          <div className="text-promise">
            <h2>Enjoy learning</h2>
            <p>Discovering new things is always an exiting moment, but as time pass, we tend to forget, the great memories fade out. With this simple tool, our whish is to provide you a way to improve your memorisation and help you remember things that matter to you.</p>
          </div>
        </article>

        <article className="explanation">
          <div className="mask">
            <div className="explanation-bloc eb-1">
              <div className="explacation-icon">
                <FontAwesomeIcon icon={faFolderOpen}/>
              </div>
              <div className="explacation-text">
                <h3>Create your folder</h3>
                <p>Create a folder to order your piles. You can create as many folder as you want and only you can acces those folders.</p>
              </div>
            </div>
          </div>
          <div className="mask">
            <div className="explanation-bloc eb-2">
              <div className="explacation-icon">
                <FontAwesomeIcon icon={faLayerGroup}/>
              </div>
              <div className="explacation-text">
                <h3>Add a pile</h3>
                <p>Once your folder is created, click on its name to enter inside the folder. You can now create your first pile of flashcard.</p>
              </div>
            </div>
          </div>
          <div className="mask">
            <div className="explanation-bloc eb-3">
              <div className="explacation-icon">
                <Image
                  src={logoBlack.src}
                  height={36}
                  width={36}
                  alt="logo"
                />
              </div>
              <div className="explacation-text">
                <h3>Make your flashcards</h3>
                <p>Enter your pile and add as many flashcard as you want by entering the question and the answer. Click on a flashcard on the list to flip a card.</p>
              </div>
            </div>
          </div>
          <div className="mask">
            <div className="explanation-bloc eb-4">
              <div className="explacation-icon">
                <FontAwesomeIcon icon={faBrain}/>
              </div>
              <div className="explacation-text">
                <h3>Time to learn !</h3>
                <p>Play with a pile of flashcard and start memorizing !</p>
              </div>
            </div>
          </div>
        </article>

        {!auth.authState && <article className="call-to-action">
          <h3 className="mb-1">Try it now for free !</h3>
          <div className="cta-buttons">
            <Link href="login">
              <button className="button yellow-button">Login</button>
            </Link>
            <Link href="register">
              <button className="button pink-button">Register</button>
            </Link>
          </div>
        </article>}

      </section>
    </div>
  )
}
