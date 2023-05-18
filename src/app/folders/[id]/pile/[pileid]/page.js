"use client"
import axios from 'axios'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import FlashcardRender from '@/components/flashcard'

export default function Pile(props) {
  const [flashcards, setFlashcards] = useState([])
  const id = props.params.id
  const pileid = props.params.pileid
  const [flashcard, setFlashcard] = useState({})

  const fetchFlashCards = () => {
    axios.get(`http://localhost:8080/pile/${pileid}/flashcards`)
    .then(res =>  setFlashcards(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchFlashCards()
  }, [])

  const submitForm = (e) => {
    console.log(flashcard)
    e.preventDefault()
    axios.post("http://localhost:8080/flashcard/create", {
      ...flashcard,
      PileId: pileid
    })
    .then(res => {
      console.log(res)
      fetchFlashCards()
      setFlashcard({})
    })
    .catch(err => console.log(err))
  }

  const deleteItem = (id) => {
    axios.delete(`http://localhost:8080/flashcard/${id}`)
    .then(res => {
      console.log(res)
      fetchFlashCards()
    })
    .catch(res => console.log(res))
  }

  return (
    <div>
      <h1>Pile</h1>
      <section>
        <h2>Create a new Flashcard</h2>
        <form method="post" onSubmit={submitForm}>
          <label>
            Question : <input name="question" placeholder="question" value={flashcard.question || ""} onChange={e => setFlashcard({...flashcard, question: e.target.value})}/>
          </label>
          <label>
            Answer : <input name="answer" placeholder="answer" value={flashcard.answer || ""} onChange={e => setFlashcard({...flashcard, answer: e.target.value})}/>
          </label>
          <button type="submit">Submit form</button>
        </form>
      </section>
      <section></section>
      <section>
        <h2>My Flashcards</h2>
        {
          flashcards.map(flashcard => {
            return (
              <article key={flashcard.id}>
                <FlashcardRender flashcard={flashcard}/>
                <button onClick={() => deleteItem(flashcard.id)}>Delete</button>
              </article>
            )
          })
        }
      </section>
      <Link href={`/folders/${id}`}>Go Back</Link>
    </div>
  )
}
