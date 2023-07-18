import React, { useEffect, useState } from 'react';
import { authService } from '../fbase';
import Router from './Router';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [ready, setReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(user);
      } else {
        setIsLoggedIn(null);
      }
      setReady(true);
    });
  }, []);

  return <>{ready ? <Router isLoggedIn={isLoggedIn} /> : 'Loading...'}</>;
}

export default App;
