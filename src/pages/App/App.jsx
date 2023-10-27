import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getUser } from "../../utilities/users-service";

import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import "./App.css";
import Home from "../Home/Home";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Home user={user} />
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
