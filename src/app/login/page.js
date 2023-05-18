'use client'
import Link from 'next/link'
import {useState} from 'react'
import axios from 'axios'

export default function Login() {
  const [credentials, setCredentials] = useState({})

  const submitForm = (e) => {
    e.preventDefault()
    console.log("Credentials", credentials)
    axios.post("http://localhost:8080/login/password", credentials)
  }

  return (
    <div>
      <h1>Login</h1>
      <form method="post" onSubmit={submitForm} className="flex-col">
          <label>
            Username : <input name="username" placeholder="username" onChange={e => setCredentials({...credentials, userName: e.target.value})}/>
          </label>
          <label>
            password : <input name="password" placeholder="password" type="password" onChange={e => setCredentials({...credentials, password: e.target.value})}/>
          </label>
          <button type="submit">Submit form</button>
        </form>
        <p>No account yet ? <Link href="/register">Register</Link></p>
      <Link href="/">Home</Link>
    </div>
  )
}
