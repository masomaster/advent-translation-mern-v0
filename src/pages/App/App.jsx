import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getUserProfile } from "../../utilities/users-service";

import NavBar from "../../components/NavBar/NavBar";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import "./App.css";
import Home from "../Home/Home";

export default function App() {
  const [profile, setProfile] = useState(getUserProfile());
  console.log("profile in App.jsx: ", profile);

  return (
    <main className="App">
      {profile ? (
        <>
          <NavBar profile={profile} setProfile={setProfile} />
          <Routes>
            <Route path="/orders/new" element={<NewOrderPage />} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          </Routes>
          <Home profile={profile} setProfile={setProfile} />
        </>
      ) : (
        <AuthPage setProfile={setProfile} />
      )}
    </main>
  );
}
