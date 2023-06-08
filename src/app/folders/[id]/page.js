"use client"
import axios from 'axios'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import { useRouter } from 'next/navigation';
import Pile from "@/components/pile"

export default function Folder(props) {
  const [folder, setFolder] = useState({})
  const [piles, setPiles] = useState([])
  const [pileName, setPileName] = useState("")
  const [authorized, setAuthorized] = useState(false)
  const folderId = props.params.id
  const router = useRouter();

  const fetchPiles = () => {
    axios.get(`http://localhost:8080/folder/${folderId}/piles`, { withCredentials: true })
    .then(res => {
      setAuthorized(true)
      setPiles(res.data)})
    .catch(err => console.log(err))
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/folder/${folderId}`, { withCredentials: true })
    .then(res => {
      setFolder(res.data)
      fetchPiles()
    })
    .catch(err => {
      console.log(err)
      router.push("/folders")
    })
  }, [])

  const createPile = (e) => {
    e.preventDefault()

    axios.post(`http://localhost:8080/pile/create`, {
      name: pileName,
      folderId: folderId
    }, { withCredentials: true })
    .then(res => {
      console.log(res)
      fetchPiles()
      setPileName("")
    })
    .catch(err => console.log(err))
  }

  const deletePile = (id) => {
    axios.delete(`http://localhost:8080/pile/${id}`, { withCredentials: true })
    .then(res => {
      console.log(res)
      fetchPiles()
    })
    .catch(res => console.log(res))
  }

  const editPile = (id, name) => {
    axios.put(`http://localhost:8080/pile/${id}`,
      {
        name: name
      },
      { withCredentials: true }
    )
    .then(res => {
      console.log(res)
      fetchPiles()
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="content-layout">
      <div className="title-box">
        <h2>Folder - {folder.name}</h2>
      </div>
      <section className="desc-box">
          <p>On this page, you may create your pile of Flashcard. You can play with one pile at a time, so make sure all the card you want to play with are grouped inside the same pile.</p>
        </section>
      <section>
        {
          piles.map((pile, index) => {
            return (
              <Pile key={index} pile={pile} deleteFunction={deletePile} editFunction={editPile}/>
            )
          })
        }
      </section>
      {
        authorized &&
        <section className="mask">
        <form className="form-blue" method="post" onSubmit={createPile}>
          <h3 className="mb-1">Create a new Pile</h3>
          <label>
            Name : <input name="name" placeholder="name" value={pileName} onChange={e => setPileName(e.target.value)}/>
          </label>
          <button type="submit" className="button yellow-button">Submit form</button>
        </form>
      </section>
      }
      <div className="button-box">
        <Link href="/folders"><button className="button yellow-button">back to folders</button></Link>
      </div>
    </div>
  )
}
