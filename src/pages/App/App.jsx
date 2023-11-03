import { useState } from "react";
import { getUser } from "../../utilities/users-service";

import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import Home from "../Home/Home";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [currentDay, setCurrentDay] = useState(user?.latestDay || 1);
  // Uncomment the following when it's time to deploy
  // const [currentDay, setCurrentDay] = useState(Math.min(user.latestDay || 1, new Date().getDate()));

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar
            user={user}
            setUser={setUser}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
          />
          <Home
            user={user}
            currentDay={currentDay}
            setCurrentDay={setCurrentDay}
          />
        </>
      ) : (
        <AuthPage setUser={setUser} />
      )}
    </main>
  );
}
