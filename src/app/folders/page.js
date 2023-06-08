"use client"
import Link from 'next/link'
import axios from 'axios'
import {useState, useEffect} from 'react'
import Folder from '@/components/folder'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlus} from '@fortawesome/free-solid-svg-icons'

export const Metadata = {
  title: 'Folders',
};

export default function Myfolders() {
  const [folders, setFolders] = useState([])
  const [folderName, setFolderName] = useState("")
  const [createNew, setCreateNew] = useState(false)
  const [error, setError] = useState(false)

  const fetchFolder = () => {
    const url = "http://localhost:8080/folders/my"
    axios.get(url, { withCredentials: true })
    .then(res => {
      console.log("res", res)
      setFolders(res.data)
    })
    .catch(err => {
      setError(true)
      console.log(err)
    })
  }

  const createFolder = (e) => {
    e.preventDefault()

    axios.post("http://localhost:8080/folder/create",
      {
        name: folderName
      },
      { withCredentials: true }
    )
    .then(res => {
      console.log(res)
      fetchFolder()
      setFolderName("")
      setCreateNew(false)
    })
    .catch(err => console.log(err))
  }

  const deleteFolder = (id) => {
    axios.delete(`http://localhost:8080/folder/${id}`, { withCredentials: true })
    .then(res => {
      console.log(res)
      fetchFolder()
    })
    .catch(res => console.log(res))
  }

  const editFolder = (id, name) => {
    axios.put(`http://localhost:8080/folder/${id}`,
      {
        name: name
      },
      { withCredentials: true }
    )
    .then(res => {
      console.log(res)
      fetchFolder()
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchFolder()
  }, [])

  return (
    <div className="content-layout">
      <div className="title-box">
        <h1>My folders</h1>
      </div>
      {error ?
      <section className="error-box">
        <h2 className="mb-1">You must login to see this page</h2>
          <Link href="/login">
            <button className="button yellow-button">Login</button>
          </Link>
      </section>
      :
      <div>
        <section className="desc-box">
          <p>To organise your work, create your folders by clicking Add new and chosing a name for your folder. You may create as many folder as you wish. Once your folder is set, click on its name to enter inside the folder</p>
        </section>
        <section className="folder-grid">
          {
            folders.map((folder, index) => {
              return (
                <Folder key={index} folder={folder} deleteFunction={deleteFolder} editFunction={editFolder}/>
              )
            })
          }
          {!createNew && <div onClick={() => setCreateNew(!createNew)} className="folder-card">
            <FontAwesomeIcon icon={faPlus} className="filligrane"/>
            <p>Add new</p>
          </div>}
          {
          createNew &&
        <section className='mask'>
          <form className="form-blue" method="post" onSubmit={createFolder}>
            <label>
              New folder : <input name="name" placeholder="chose a name" value={folderName} onChange={e => setFolderName(e.target.value)}/>
            </label>
            <div className="form-button-box">
              <button type="submit" className="button yellow-button">Create</button>
              <button onClick={() => setCreateNew(false)} className="button pink-button">Cancel</button>
            </div>
          </form>
        </section>}
        </section>

        </div>
      }
    </div>
  )
}
