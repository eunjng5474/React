import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "../routes/Home";
import Auth from "../routes/Auth";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

export default ({isLoggedIn}) => {
  return (
    <Router>
      {isLoggedIn && <Navigation/>}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </>
        ) : (
          <Route path="/" element={<Auth/>}/>
          )}
      </Routes>
    </Router>
  )
}