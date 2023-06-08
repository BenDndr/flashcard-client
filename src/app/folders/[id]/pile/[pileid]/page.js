"use client"
import axios from 'axios'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import FlashcardRender from '@/components/flashcard'
import { useRouter } from 'next/navigation';

export default function Pile(props) {
  const id = props.params.id
  const pileid = props.params.pileid
  const [flashcards, setFlashcards] = useState([])
  const [pile, setPile] = useState({})
  const [flashcard, setFlashcard] = useState({})
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [playModeActive, setPlayModeActive] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [point, setPoint] = useState(0)
  const [editDrawerVisible, setEditDrawerVisible] = useState(false)
  const [questionToEdit, setQuestionToEdit] = useState("")
  const [answerToEdit, setAnswerToEdit] = useState("")
  const [idToEdit, setIdToEdit] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const router = useRouter();

  const fetchFlashCards = () => {
    axios.get(`http://localhost:8080/pile/${pileid}/flashcards`, { withCredentials: true })
    .then(res =>  setFlashcards(res.data))
    .catch(err => console.log(err))
  }

  const fetchPile = () => {
    console.log(pileid)
    axios.get(`http://localhost:8080/pile/${pileid}`, { withCredentials: true })
    .then(res => {
      console.log("res", res)
      setPile(res.data)
      fetchFlashCards()
    })
    .catch(err => {
      console.log("err", err)
      router.push("/")
    })
  }

  useEffect(() => {
    fetchPile()
  }, [])

  const createFlashcard = (e) => {
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

  const deleteFlashcard = (id) => {
    axios.delete(`http://localhost:8080/flashcard/${id}`, { withCredentials: true })
    .then(res => {
      console.log(res)
      fetchFlashCards()
    })
    .catch(res => console.log(res))
  }

  const editFlashcard = (e) => {
    e.preventDefault()
    console.log(idToEdit)
    console.log(questionToEdit)
    console.log(answerToEdit)
    axios.put(`http://localhost:8080/flashcard/${idToEdit}`, {
      question: questionToEdit,
      answer: answerToEdit
    }, { withCredentials: true })
    .then(res => {
      console.log(res)
      setEditDrawerVisible(false)
      fetchFlashCards()
    })
    .catch(res => console.log(res))
  }

  const setEdit = (id, question, answer) => {
    setEditDrawerVisible(true)
    setQuestionToEdit(question)
    setAnswerToEdit(answer)
    setIdToEdit(id)
  }

  const setPlay = () => {
    setGameOver(false)
    setPlayModeActive(!playModeActive)
    setActiveCardIndex(0)
    setPoint(0)
  }

  const giveAnswer = (answer) => {
    if (activeCardIndex + 1 == flashcards.length) {
      answer && setPoint(point + 1)
      setGameOver(true)
      return
    }
    setActiveCardIndex(activeCardIndex +1)
    answer && setPoint(point + 1)
  }

  return (
    <div>
    {
      drawerVisible &&
      <div className="drawer-container">
        <aside className="drawer drawer-blue">
          <h3 className="mb-1">Create a new Flashcard</h3>
          <form method="post" onSubmit={createFlashcard}>
            <label>
              Question : <input name="question" placeholder="question" value={flashcard.question || ""} onChange={e => setFlashcard({...flashcard, question: e.target.value})}/>
            </label>
            <label>
              Answer : <input name="answer" placeholder="answer" value={flashcard.answer || ""} onChange={e => setFlashcard({...flashcard, answer: e.target.value})}/>
            </label>
            <button className="button yellow-button mb-1" type="submit">Create</button>
          </form>
          <button className="button pink-button" onClick={() => setDrawerVisible(false)}>Close</button>
        </aside>
        <div onClick={() => setDrawerVisible(false)} className="clickabe-opacity">
        </div>
      </div>
    }
    {
      editDrawerVisible &&
      <div className="drawer-container">
        <aside className="drawer drawer-pink">
          <h3 className="mb-1">Edit a flashcard</h3>
          <form method="put" onSubmit={editFlashcard}>
            <label>
              Question : <input name="question" placeholder="question" value={questionToEdit} onChange={e => setQuestionToEdit(e.target.value)}/>
            </label>
            <label>
              Answer : <input name="answer" placeholder="answer" value={answerToEdit} onChange={e => setAnswerToEdit(e.target.value)}/>
            </label>
            <button className="button yellow-button mb-1" type="submit">Edit</button>
          </form>
          <button className="button blue-button" onClick={() => setEditDrawerVisible(false)}>Close</button>
        </aside>
        <div onClick={() => setEditDrawerVisible(false)} className="clickabe-opacity">
        </div>
      </div>
    }
    <section className="content-layout">
      <div className="title-box">
        <h2>{pile.name}</h2>
        <div className="button-bar">
          <button className="button blue-button" onClick={() => setDrawerVisible(true)}>Create</button>
          <button className="button yellow-button" onClick={setPlay}>
          {playModeActive ? "Stop playing" : "Play this pile"}</button>
          <Link href={`/folders/${id}`}>
            <button className="button pink-button">Go Back</button>
          </Link>
        </div>
      </div>
      { playModeActive ?
      <div className="mask">
        <div className="play-field">
          <div className="play-counter">
            <p>Flashcard {activeCardIndex + 1}/{flashcards.length}</p>
          </div>
          {
            <FlashcardRender className="flashcardGame"  flashcard={flashcards[activeCardIndex]}/>
          }
          {
            gameOver ?
            <div className="play-score">
              <h3>Your Score : {point}</h3>
            </div>
            :
            <div className="play-button">
              <button className="round-button green" onClick={() => giveAnswer(true)}>Got it</button>
              <button className="round-button red" onClick={() => giveAnswer(false)}>Didnt had it</button>
            </div>
          }
          { gameOver &&
            <div className="play-button">
            <button className="button green" onClick={setPlay}>Close</button>
          </div>
          }
        </div>
      </div>

      :
      <div className="flashcards-grid">
        {flashcards.length == 0 && <h3 className="centered-message">You do not have any flashcard on this pile yet.</h3>}
        {
          flashcards.map(flashcard => {
            return (
              <article key={flashcard.id}>
                <FlashcardRender flashcard={flashcard}/>
                <div className="button-box mw">
                  <button className="button pink-button" onClick={() => deleteFlashcard(flashcard.id)}>Delete</button>
                  <button className="button pink-button" onClick={() => setEdit(flashcard.id, flashcard.question, flashcard.answer)}>Edit</button>
                </div>
              </article>
            )
          })
        }
      </div>

      }
    </section>
    </div>
  )
}
