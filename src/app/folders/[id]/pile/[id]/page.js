"use client"
import axios from 'axios'
import Link from 'next/link'
import {useEffect, useState} from 'react'

export default function Folder(props) {
  const [flashcards, setFlashcards] = useState([])
  const id = props.params.id

  const fetchPile = () => {
    axios.get(`http://localhost:8080/folder/${id}`)
    .then(res =>  setFlashcards(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchPile()
  })

  return (
    <main>
      <h1>Pile</h1>
    </main>
  )
}
