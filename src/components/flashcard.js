'use client'
import {useState} from 'react'

export default function FlashcardRender({flashcard}) {
  const [revealAnswer, setRevealAnswer] = useState(false)

  return (
    <div onClick={() => setRevealAnswer(!revealAnswer)}>
      {revealAnswer ? flashcard.answer : flashcard.question}
    </div>
  )
}
