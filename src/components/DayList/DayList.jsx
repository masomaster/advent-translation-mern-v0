import * as days from "../../days.json";

export default function DayList({ setCurrentDay }) {
  const dayListEntryStyle = {
    backgroundColor: "lightblue",
    fontSize: "16px",
    margin: "10px",
  };

  // Render a span for each day in days.json up to the current day of the month in December
  const numberOfKeys = Object.keys(days).length;
  const currentMonthDay = new Date().getDate();
  const dayList = [];
  for (let i = 0; i < currentMonthDay && i < numberOfKeys - 1; i++) {
    dayList.push(
      <span
        className="dayListEntry"
        style={dayListEntryStyle}
        onClick={() => setCurrentDay(i + 1)}
        key={i}
      >
        Day {i + 1}
      </span>
    );
  }

  return <div className="DayList">{dayList}</div>;
}
