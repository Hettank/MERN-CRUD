import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Edit from "./pages/Edit/Edit";
import Profile from "./pages/Profile/Profile";

import { Routes, Route } from "react-router-dom";
import CustomCard from "./components/Cards/CustomCard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/card" element={<CustomCard />} />
      </Routes>
    </>
  );
}

export default App;
