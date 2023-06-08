'use client'
import {useState, useEffect} from 'react'
import Image from "next/image";
import Logo from "../app/images/logo-nb1.png"

export default function FlashcardRender({flashcard}) {
  const [revealAnswer, setRevealAnswer] = useState(false)

  useEffect(() => {
    setRevealAnswer(false)
  }, [flashcard])

  return (
    <article className={revealAnswer ? "flashcard flashcard-back" : "flashcard flashcard-front"} onClick={() => setRevealAnswer(!revealAnswer)}>
      {revealAnswer && <Image
        src={Logo.src}
        width={200}
        height={200}
        alt="Logo Flashcard"
      />}
      <p className="header">{revealAnswer ? "Answer" : "Question"}</p>
      <p>{revealAnswer ? flashcard.answer : flashcard.question}</p>
    </article>
  )
}
