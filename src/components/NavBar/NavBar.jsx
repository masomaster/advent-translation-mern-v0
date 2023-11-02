import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import DayList from "../DayList/DayList";

export default function NavBar({ user, setUser, setCurrentDay }) {
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  return (
    <nav>
      <p>Welcome, {user.firstName}</p>
      <DayList setCurrentDay={setCurrentDay} />
      <Link to="" onClick={handleLogOut}>
        Log Out
      </Link>
    </nav>
  );
}
