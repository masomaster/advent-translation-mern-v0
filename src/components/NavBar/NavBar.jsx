import { useState } from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import DayList from "../DayList/DayList";

export default function NavBar({ user, setUser, setCurrentDay }) {
  const [checked, setChecked] = useState(false);
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav className="navbar">
      <div className={`overlay ${checked ? "visible" : ""}`}></div>
      <div className="ham-container nav-container">
        <input
          className="checkbox"
          type="checkbox"
          checked={checked}
          onChange={() => {}} // Dummy onChange handler to avoid React warning
          onClick={() => setChecked(!checked)}
        />
        <div className="hamburger-lines" onClick={() => setChecked(false)}>
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </div>
        <div className="logo">
          <h3>Advent Translation</h3>
        </div>
        <div className="menu-items">
          <li id="welcome" onClick={() => setChecked(false)}>
            Welcome, {user.firstName}
          </li>
          <li id="logout">
            <Link to="" onClick={handleLogOut}>
              Log Out
            </Link>
          </li>
          <DayList
            setCurrentDay={setCurrentDay}
            setChecked={setChecked}
            checked={checked}
          />
        </div>
      </div>
    </nav>
  );
}
