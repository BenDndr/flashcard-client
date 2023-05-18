'use client'
import Link from 'next/link'
import {useState} from 'react'
import axios from 'axios'

export default function Register() {
  const [credentials, setCredentials] = useState({})

  const submitForm = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/user/create', credentials)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>Register</h1>
      <form method="post" onSubmit={submitForm} className="flex-col">
        <label>
          Email : <input name="email" placeholder="email" onChange={e => setCredentials({...credentials, email: e.target.value})}/>
        </label>
        <label>
          Username : <input name="username" placeholder="username" onChange={e => setCredentials({...credentials, username: e.target.value})}/>
        </label>
        <label>
          password : <input name="password" placeholder="password" type="password" onChange={e => setCredentials({...credentials, password: e.target.value})}/>
        </label>
        <button type="submit">Submit form</button>
      </form>
      <p><Link href="/login">Go Back</Link></p>
      <Link href="/">Home</Link>
    </div>
  )
}
