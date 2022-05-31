import React from "react";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}></Route>
    </Routes>
  );
};

export default App;
