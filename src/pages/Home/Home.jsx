import { useState } from "react";
import DayList from "../../components/DayList/DayList";
import DayTranslations from "../../components/DayTranslations/DayTranslations";

export default function Home({ user, currentDay, setCurrentDay }) {
  return (
    <div>
      {/* <DayList setCurrentDay={setCurrentDay} /> */}
      <div>
        <h3>Advent Translation</h3>
        <h4>Day {currentDay}</h4>
      </div>
      <DayTranslations
        user={user}
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
      />
    </div>
  );
}
