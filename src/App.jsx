import React from "react";
import Posts from "./Pages/Posts/Posts";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Post from "./Pages/Post/Post";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/users/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
