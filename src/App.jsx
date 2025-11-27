import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// Importing page components
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddRecord from "./pages/AddRecord";
import Timeline from "./pages/Timeline";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-record" element={<AddRecord />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
