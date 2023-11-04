import * as days from "../../days.json";

export default function DayList({ setCurrentDay, setChecked, isProduction }) {
  // Render a span for each day in days.json up to the current day of the month in December
  const numberOfKeys = Object.keys(days).length;

  // If in Production, only show days up to the current day of the month
  // Commented-out code checks makes this only work if it is December
  const maxDays = isProduction
    ? // ? new Date().getMonth() === 11
      new Date().getDate()
    : 100;
  // : 100;
  const dayList = [];

  // This isn't pretty, but it avoids state issues with checked being false before currentDay is set
  async function changeDay(d) {
    setCurrentDay(d);
  }
  async function changeChecked() {
    setChecked(false);
  }
  async function handleClick(d) {
    await changeDay(d);
    await changeChecked();
  }

  for (let i = 0; i < maxDays && i < numberOfKeys - 1; i++) {
    dayList.push(
      <li className="day-list-entry" onClick={() => handleClick(i + 1)} key={i}>
        Dec {i + 1}
      </li>
    );
  }

  return <div className="day-list">{dayList}</div>;
}
