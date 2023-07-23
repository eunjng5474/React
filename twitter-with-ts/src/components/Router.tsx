import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Profile from '../routes/Profile';
import Navigation from './Navigation';
import { User } from 'firebase/auth';
import { UserInfo } from './App';

// interface RouterProps {
//   isLoggedIn: User | null;
// }

function Router({ uid, displayName }: UserInfo) {
  // User not Logged In Router
  if (!uid) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      {<Navigation />}
      <Routes>
        <Route path="/" element={<Home uid={uid} />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
