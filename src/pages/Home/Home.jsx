import { useState } from "react";
import DayList from "../../components/DayList/DayList";
import DayTranslations from "../../components/DayTranslations/DayTranslations";

export default function Home({ user }) {
  const [currentDay, setCurrentDay] = useState(user.latestDay || 1);

  // const [currentDay, setCurrentDay] = useState(Math.min(user.latestDay || 1, new Date().getDate()));

  return (
    <div>
      <DayList setCurrentDay={setCurrentDay} />
      <div>
        <h1>Welcome to Advent Translation, {user.firstName}!</h1>
        <h3>You are on Day {currentDay}.</h3>
      </div>
      <DayTranslations
        user={user}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
      />
    </div>
  );
}
