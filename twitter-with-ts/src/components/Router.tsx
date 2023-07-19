import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';
import { User } from 'firebase/auth';

interface RouterProps {
  isLoggedIn: User | null;
}

function Router({ isLoggedIn }: RouterProps) {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navigation />}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/Profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
