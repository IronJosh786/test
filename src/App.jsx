import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./components/Profile.jsx";
import AllUser from "./components/AllUser.jsx";
import NewTransaction from "./components/NewTransaction.jsx";
import AllTransaction from "./components/AllTransaction.jsx";
import "./App.css";
import Auth from "./components/Auth.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Auth />}>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<AllUser />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/new-transaction/:givenUserName?"
              element={<NewTransaction />}
            />
            <Route path="/all-transactions" element={<AllTransaction />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
