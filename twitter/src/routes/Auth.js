import React, { useState } from "react";
import {
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { authService } from "../fbase";

export default () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState("")

  const onChange = (event) => {
    const {
        target: { name, value },
    } = event;
    if (name === "email") {
        setEmail(value);
    } else if (name === "password") {
        setPassword(value);
    }
  }
  const onSubmit = async(e) => {
    e.preventDefault()
    try {
      let data;
      const auth = getAuth()
      if(newAccount){
        data = await createUserWithEmailAndPassword(auth, email, password)
      } else {
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      console.log(data)
    } catch (error){
      setError(error.message)
    }
  }
  const toggleAccount = () => setNewAccount(prev => !prev)
  const onSocialClick = async (e) => {
    const {
      target: {name},
    } = e;
    let provider;
    if(name === "google"){
      provider = new GoogleAuthProvider()
    } else if (name === "github") {
      provider = new GithubAuthProvider()
    }
    const data = await signInWithPopup(authService, provider)
    console.log(data)
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input name="email" type="text" placeholder="Email" 
          required value={email} onChange={onChange}/>
        <input name="password" type="password" placeholder="Password" 
          required value={password} onChange={onChange}/>
        <input type="submit" value={newAccount ? "create Account": "Log In"}/>
        {error && <span>{error.replace("Firebase: ", "")}</span>}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </span>
      <div>
        <button onClick={onSocialClick} name="google">Continue with Google</button>
        <button onClick={onSocialClick} name="github">Continue with Github</button>
      </div>
    </div>
  )
}