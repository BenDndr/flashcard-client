'use client'
import {useState} from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFolderOpen} from '@fortawesome/free-solid-svg-icons'

export default function Folder({folder, deleteFunction, editFunction}) {
  const [edit, setEdit] = useState(false)
  const [newFolderName, setNewFolderName] = useState(folder.name)

  const editFolder = () => {
    editFunction(folder.id, newFolderName)
    setEdit(false)
  }

  return (
    <article>
      <div className="folder-card">
      <FontAwesomeIcon icon={faFolderOpen} className="filligrane" />
        {edit ?
          <form method="post" onSubmit={editFolder}>
            <label>
            <input name="name" placeholder={folder.name} value={newFolderName} onChange={e => setNewFolderName(e.target.value)}/>
            </label>
            <button className='button pink-button' type="submit">Change folder name</button>
            <button className='button pink-button' onClick={() => setEdit(false)}>Cancel</button>
          </form>
        : <Link href={{pathname: `/folders/${folder.id}`}}><p>{folder.name}</p></Link>}
      </div>
      <div className="button-box">
        <button className="button pink-button" onClick={() => setEdit(true)}>Edit</button>
        <button className="button pink-button" onClick={() => deleteFunction(folder.id)}>Delete</button>
      </div>
    </article>
  )

}
