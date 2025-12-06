// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* this is the important one */}
        <Route path="/posts/:id" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
