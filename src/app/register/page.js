'use client'
import Link from 'next/link'
import {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';

export default function Register() {
  const [credentials, setCredentials] = useState({})
  const router = useRouter();

  const submitForm = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/user/create', credentials)
    .then(res => {
      console.log(res)
      router.push('/login')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="content-layout">
      <div className="title-box">
        <h1>Register</h1>
      </div>
      <section className='mask'>
        <form method="post" onSubmit={submitForm} className="form-blue">
          <label>
            Username : <input name="username" placeholder="username" onChange={e => setCredentials({...credentials, username: e.target.value})}/>
          </label>
          <label>
            Email : <input name="email" placeholder="email" onChange={e => setCredentials({...credentials, email: e.target.value})}/>
          </label>
          <label>
            password : <input name="password" placeholder="password" type="password" onChange={e => setCredentials({...credentials, password: e.target.value})}/>
          </label>
          <button type="submit" className="button yellow-button mb-1">Submit form</button>
          <Link href="/login"><button className="button pink-button">Go Back</button></Link>
        </form>
      </section>
    </div>
  )
}
