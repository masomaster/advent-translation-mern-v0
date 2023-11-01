import * as days from "../../days.json";

export default function DayList({ setCurrentDay }) {
  const dayListEntryStyle = {
    backgroundColor: "lightblue",
    fontSize: "16px",
    margin: "10px",
  };

  // Render a span for each day in days.json up to the current day of the month in December
  const numberOfKeys = Object.keys(days).length;
  // TODO: not entirely sure if this is right. do I need to add or subtract 1 from the maxDays?
  const maxDays = new Date().getMonth() === 11 ? new Date().getDate() : 1000;
  const dayList = [];
  for (let i = 0; i < maxDays && i < numberOfKeys - 1; i++) {
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
