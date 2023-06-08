'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import { logout } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const store = useSelector(state => state);
  const {auth} = store

  const handleLogout = () => {
    axios.delete('http://localhost:8080/logout', { withCredentials: true })
    .then(res => {
      console.log("Logout Res", res)
      dispatch(logout())
      router.push('/')
    })
    .catch(err => console.log("Logout Err", err))
  }

  return (
    <div className="content-layout">
      <div className="title-box">
        <h1>{auth.username}</h1>
        <button className="button yellow-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}
