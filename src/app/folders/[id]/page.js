"use client"
import axios from 'axios'
import Link from 'next/link'
import {useEffect, useState} from 'react'

export default function Folder(props) {
  const [folder, setFolder] = useState({})
  const [piles, setPiles] = useState([])
  const [pileName, setPileName] = useState("")
  const folderId = props.params.id

  const fetchPiles = () => {
    axios.get(`http://localhost:8080/folder/${folderId}/piles`)
    .then(res => setPiles(res.data))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/folder/${folderId}`)
    .then(res =>  setFolder(res.data))
    .catch(err => console.log(err))

    fetchPiles()
  })

  const submitForm = (e) => {
    e.preventDefault()

    axios.post(`http://localhost:8080/pile/create`, {
      name: pileName,
      folderId: folderId
    })
    .then(res => {
      console.log(res)
      fetchPiles()
    })
    .catch(err => console.log(err))
  }

  return (
    <main>
      <h1>Folder {folder.name}</h1>
      <section>
        <h2>Create a new Pile</h2>
        <form method="post" onSubmit={submitForm}>
          <label>
            Name : <input name="name" placeholder="name" onChange={e => setPileName(e.target.value)}/>
          </label>
          <button type="submit">Submit form</button>
        </form>
      </section>
      <section>
        {
          piles.map(pile => {
            return (
              <div key={pile.id}>
                <Link href={{pathname: `/folders/${folderId}/pile/${pile.id}`}}><p>{pile.name}</p></Link>
              </div>
            )
          })
        }
      </section>
      <Link href="/folders">back</Link>
    </main>
  )
}
