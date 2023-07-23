import React, { useEffect, useState } from 'react';
import { authService } from '../fbase';
import Router from './Router';
import { onAuthStateChanged } from 'firebase/auth';

export interface UserInfo {
  uid: string;
  displayName: string | null;
}

function App() {
  const [ready, setReady] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<UserInfo>({
    uid: '',
    displayName: null,
  });
  // const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setLoggedInUser(user);
      } else {
        setLoggedInUser({ uid: '', displayName: null });
      }
      setReady(true);
    });
  }, []);

  if (ready === false) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <Router uid={loggedInUser.uid} displayName={loggedInUser.displayName} />
    </>
  );
}

export default App;
