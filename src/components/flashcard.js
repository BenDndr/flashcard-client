'use client'
import {useState} from 'react'

export default function FlashcardRender({flashcard}) {
  const [revealAnswer, setRevealAnswer] = useState(false)

  return (
    <article className={revealAnswer ? "flashcard flashcard-back" : "flashcard flashcard-front"} onClick={() => setRevealAnswer(!revealAnswer)}>
      <p>{revealAnswer ? flashcard.answer : flashcard.question}</p>
    </article>
  )
}
