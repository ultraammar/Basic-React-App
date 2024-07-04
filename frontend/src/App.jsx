// eslint-disable-next-line no-unused-vars
import React from "react";
import Navbar from "./components/Navbar/Navbar";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import RedirectIfLoggedIn from "./components/ProtectedRoute/RedirectIfLoggedIn";
import FeedbackUpdate from "./pages/FeedbackUpdate/FeedbackUpdate";

function App() {
  return (
    <main data-theme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/login" exact element={
            <RedirectIfLoggedIn>
              <Login />
            </RedirectIfLoggedIn>
        } />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/feedback-update"
            element={
              <ProtectedRoute>
                <FeedbackUpdate />
              </ProtectedRoute>
            }
          />

          
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
