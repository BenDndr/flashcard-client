"use client"
import axios from 'axios'
import Link from 'next/link'
import {useEffect, useState} from 'react'

export default function Folders() {
  const [folders, setFolders] = useState([])
  const [folderName, setFolderName] = useState("")

  const fetchFolder = () => {
    const url = "http://localhost:8080/folders"
    axios.get(url)
    .then(res => {
      setFolders(res.data)
    })
  }

  useEffect(() => {
    fetchFolder()
  }, [])

  const submitForm = (e) => {
    e.preventDefault()

    axios.post("http://localhost:8080/folder/create",
      {
        name: folderName,
        userId: 1
      }
    )
    .then(res => {
      console.log(res)
      fetchFolder()
      setFolderName("")
    })
    .catch(err => console.log(err))
  }

  const deleteItem = (id) => {
    axios.delete(`http://localhost:8080/folder/${id}`)
    .then(res => {
      console.log(res)
      fetchFolder()
    })
    .catch(res => console.log(res))
  }

  return (
    <div>
      <h1>Folders</h1>
      <section>
        <h2>Create a new folder</h2>
        <form method="post" onSubmit={submitForm}>
          <label>
            Name : <input name="name" placeholder="name" value={folderName} onChange={e => setFolderName(e.target.value)}/>
          </label>
          <button type="submit">Submit form</button>
        </form>
      </section>

      <section>
        <h2>My Folders</h2>
        {folders.map(folder => {
          return (
            <div key={folder.id}>
              <Link href={{pathname: `/folders/${folder.id}`}}>{folder.name}</Link>
              <button onClick={() => deleteItem(folder.id)}>Delete</button>
            </div>
          )
        })}
      </section>
      <Link href="/">Home</Link>
    </div>
  )
}
