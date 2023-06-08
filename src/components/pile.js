"use client"
import {useState} from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLayerGroup} from '@fortawesome/free-solid-svg-icons'

const Pile = ({pile, editFunction, deleteFunction}) => {

  const [edit, setEdit] = useState(false)
  const [newPileName, setNewPileName] = useState(pile.name)

  const editPile = () => {
    editFunction(pile.id, newPileName)
    setEdit(false)
  }

  return (
    <article className="mask">
      <div className="pile-card mb-1">
        {edit ?
        <form method="post" onSubmit={editPile} className="pile-form">
        <label>
          <input name="name" placeholder={pile.name} value={newPileName} onChange={e => setNewPileName(e.target.value)}/>
          </label>
            <button className='button blue-button' type="submit">Change folder name</button>
            <button className='button blue-button' onClick={() => setEdit(false)}>Cancel</button>
        </form>
          :
          <div className="pile-title">
            <div className="explacation-icon desktop-only">
              <FontAwesomeIcon icon={faLayerGroup}/>
            </div>
            <p>{pile.name}</p>
          </div>
        }
        {
          !edit &&
          <div className="buttons-div">
            <Link href={{pathname: `/folders/${pile.FolderId}/pile/${pile.id}`}}><button className="button blue-button">View</button></Link>
            <button className="button yellow-button" onClick={() => deleteFunction(pile.id)}>Delete</button>
            <button className="button yellow-button" onClick={() => setEdit(true)}>Edit</button>
          </div>
        }
      </div>
    </article>
  )
}

export default Pile
