import React, { useState, useEffect } from "react";
import Router from "./Router";
import {authService} from "../fbase";
import {getAuth, onAuthStateChanged} from 'firebase/auth'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      if(user){
        setIsLoggedIn(true)
        // const uid = user.uid
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      {init ? <Router isLoggedIn={isLoggedIn} userObj={userObj}/> 
        : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Twitter</footer>
    </>
  );
}

export default App;
