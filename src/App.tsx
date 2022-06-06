import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/UI/Navbar/Navbar";
import Dashboard from "./Components/UI/Dashboard/Dashboard";
import About from "./Components/About/About";
import Home from "./Components/Home/Home";
import Technologies from "./Components/Technologies/Technologies";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Sign Up/SignUp";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />}></Route>
        <Route path="/technologies" element={<Technologies />}> </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
