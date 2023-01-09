import React from "react";
import App from "../App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tasks" element={<App />} />
        <Route path="/messages" element={<App />} />
        <Route path="/messages/:tags" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
