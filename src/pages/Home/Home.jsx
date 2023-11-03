import { useState } from "react";
import * as days from "../../days.json";
import TranslationPanel from "../../components/TranslationPanel/TranslationPanel";
// import DayTranslations from "../../components/DayTranslations/DayTranslations";

export default function Home({ user, currentDay, setCurrentDay }) {
  const [languageIsHebrew, setLanguageIsHebrew] = useState(true);
  const dayData = languageIsHebrew ? days[currentDay].OT : days[currentDay].NT;
  const numOfDays = Object.keys(days).filter((key) => key !== "default").length;

  function handleIncrement() {
    if (currentDay < numOfDays) {
      setCurrentDay(currentDay + 1);
      setLanguageIsHebrew(true);
    }
  }

  function handleDecrement() {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
      setLanguageIsHebrew(true);
    }
  }

  function dontExceedDecDate() {
    return new Date().getMonth() === 11
      ? currentDay <= new Date().getDate()
      : 100;
  }

  return (
    <div>
      <div>
        <h4>December {currentDay}:</h4>
      </div>
      <div>
        <TranslationPanel
          user={user}
          currentDay={currentDay}
          languageIsHebrew={languageIsHebrew}
          setLanguageIsHebrew={setLanguageIsHebrew}
          dayData={dayData}
        />
        {currentDay !== 1 && (
          <button onClick={() => handleDecrement()}>previous day</button>
        )}
        {currentDay !== numOfDays && currentDay <= dontExceedDecDate() && (
          <button onClick={() => handleIncrement()}>next day</button>
        )}
      </div>
    </div>
  );
}
