'use client'
import Link from 'next/link'
import {useState} from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { login } from "../../store/authSlice";
import { useDispatch } from "react-redux";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false)
  const router = useRouter();

  const dispatch = useDispatch();

  const validateLogin = (e) => {
    e.preventDefault()
    console.log("username", username)
    console.log("password", password)

    const requestBody = {
      username,
      password
    }

    axios.post("http://localhost:8080/login", requestBody, { withCredentials: true })
    .then(res => {
      console.log(res)
      dispatch(login(username))
      router.push("/folders")
    })
    .catch(err => {
      console.log("err", err)
      setError(true)
    })
  }

  return (
    <div className="content-layout">
      <div className="title-box">
        <h1>Login</h1>
      </div>
      <section className='mask'>
        <form method="post" className="form-blue" onSubmit={validateLogin}>
            <label>
              Username : <input name="username" placeholder="username" onChange={e => setUsername(e.target.value)}/>
            </label>
            <label>
              password : <input name="password" placeholder="password" type="password" onChange={e => setPassword(e.target.value)}/>
            </label>
            <button className="button yellow-button mb-1" type="submit"> Login</button>
            <p>No account yet ? <Link href="/register"><button className="button pink-button">Register</button></Link></p>
          </form>
      </section>
      {
        error &&
        <section className="error-box">
        <p>Wrong login or password, please try again.</p>
        </section>
      }
    </div>
  )
}
