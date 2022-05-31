import React from "react";
import { Routes, Route } from "react-router-dom";
import CalendarPage from "./CalendarPage/CalendarPage";
import Layout from "./layout";
import LibraryPage from "./LibraryPage/LibraryPage";
import SearchPage from "./SearchPage/SearchPage";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<SearchPage />} />
        <Route element={<LibraryPage />} path="library" />
        <Route element={<CalendarPage />} path="calendar" />
      </Route>
    </Routes>
  );
};

export default App;
