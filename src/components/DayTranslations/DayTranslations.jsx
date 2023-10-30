import * as days from "../../days.json";
import TranslationPanel from "../TranslationPanel/TranslationPanel";

export default function DayTranslations({ user, currentDay, setCurrentDay }) {
  const dayData = days[currentDay];
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
        language="hebrew"
        dayData={dayData.OT}
      />
      <TranslationPanel
        user={user}
        currentDay={currentDay}
        language="greek"
        dayData={dayData.NT}
      />
      <button onClick={() => handleDecrement()}>previous day</button>
      <button onClick={() => handleIncrement()}>next day</button>
    </div>
  );
}
