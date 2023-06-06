"use client"
import {useState} from 'react'
import Link from 'next/link'

const Pile = ({pile, editFunction, deleteFunction}) => {

  const [edit, setEdit] = useState(false)
  const [newPileName, setNewPileName] = useState(pile.name)

  const editPile = () => {
    editFunction(pile.id, newPileName)
    setEdit(false)
  }

  return (
    <article className="mask">
      <div className="pile-card">
        {edit ?
        <form method="post" onSubmit={editPile}>
        <label>
          <input name="name" placeholder={pile.name} value={newPileName} onChange={e => setNewPileName(e.target.value)}/>
          </label>
            <button className='button blue-button' type="submit">Change folder name</button>
            <button className='button blue-button' onClick={() => setEdit(false)}>Cancel</button>
        </form>
          :
          <p>{pile.name}</p>
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
