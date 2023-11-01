import { useState } from "react";
import * as days from "../../days.json";
import TranslationPanel from "../TranslationPanel/TranslationPanel";

export default function DayTranslations({ user, currentDay, setCurrentDay }) {
  const [languageIsHebrew, setLanguageIsHebrew] = useState(true);
  const dayData = languageIsHebrew ? days[currentDay].OT : days[currentDay].NT;
  const numOfDays = Object.keys(days).filter((key) => key !== "default").length;

  function handleIncrement() {
    if (currentDay < numOfDays) setCurrentDay(currentDay + 1);
  }

  function handleDecrement() {
    if (currentDay > 1) setCurrentDay(currentDay - 1);
  }

  return (
    <div>
      <TranslationPanel
        user={user}
        currentDay={currentDay}
        languageIsHebrew={languageIsHebrew}
        setLanguageIsHebrew={setLanguageIsHebrew}
        dayData={dayData}
      />
      <button onClick={() => handleDecrement()}>previous day</button>
      <button onClick={() => handleIncrement()}>next day</button>
    </div>
  );
}
