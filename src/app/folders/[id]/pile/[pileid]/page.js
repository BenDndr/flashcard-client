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
  const [drawerVisible, setDrawerVisible] = useState(false)

  const fetchFlashCards = () => {
    axios.get(`http://localhost:8080/pile/${pileid}/flashcards`, { withCredentials: true })
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
    }, { withCredentials: true })
    .then(res => {
      console.log(res)
      fetchFlashCards()
      setFlashcard({})
      setDrawerVisible(false)
    })
    .catch(err => console.log(err))
  }

  const deleteItem = (id) => {
    axios.delete(`http://localhost:8080/flashcard/${id}`, { withCredentials: true })
    .then(res => {
      console.log(res)
      fetchFlashCards()
    })
    .catch(res => console.log(res))
  }

  return (
    <section className="flex-screen">
      <aside className="drawer-desktop">
        <div className="form-sticky">
          <form  method="post" onSubmit={submitForm}>
          <h3 className="mb-1">Create a new Flashcard</h3>
            <label>
              Question : <input name="question" placeholder="question" value={flashcard.question || ""} onChange={e => setFlashcard({...flashcard, question: e.target.value})}/>
            </label>
            <label>
              Answer : <input name="answer" placeholder="answer" value={flashcard.answer || ""} onChange={e => setFlashcard({...flashcard, answer: e.target.value})}/>
            </label>
            <button className="button yellow-button" type="submit">Submit form</button>
          </form>
        </div>

      </aside>
      {!drawerVisible && <button className="button blue-button aside-button" onClick={() => setDrawerVisible(true)}>Create</button>}
      {
        drawerVisible &&
        <div className="drawer-container">
          <aside className="drawer-mobile">
            <h3 className="mb-1">Create a new Flashcard</h3>
            <form method="post" onSubmit={submitForm}>
              <label>
                Question : <input name="question" placeholder="question" value={flashcard.question || ""} onChange={e => setFlashcard({...flashcard, question: e.target.value})}/>
              </label>
              <label>
                Answer : <input name="answer" placeholder="answer" value={flashcard.answer || ""} onChange={e => setFlashcard({...flashcard, answer: e.target.value})}/>
              </label>
              <button className="button yellow-button mb-1" type="submit">Submit form</button>
            </form>
            <button className="button pink-button" onClick={() => setDrawerVisible(false)}>close</button>
          </aside>
          <div onClick={() => setDrawerVisible(false)} className="clickabe-opacity">

          </div>
        </div>
      }
      <section className="left-side">
        <div className="title-box">
          <h2>Pile</h2>
        </div>
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
        <Link href={`/folders/${id}`}>Go Back</Link>
      </section>

    </section>
  )
}
