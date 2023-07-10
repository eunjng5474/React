import React, { useState, useEffect } from 'react';
import Router from './Router';
import { authService } from '../fbase';
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: () => updateProfile(user, { displayName: user.displayName }),
    });
  };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        // const uid = user.uid
        refreshUser();
        if (user.displayName === null) {
          const name = user.email.split('@')[0];
          user.displayName = name;
        }
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>{init ? <Router isLoggedIn={isLoggedIn} userObj={userObj} refreshUser={refreshUser} /> : 'Initializing...'}</>
  );
}

export default App;
