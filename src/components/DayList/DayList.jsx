import * as days from "../../days.json";

export default function DayList({ user, currentDay, setCurrentDay }) {
  const dayListEntryStyle = {
    backgroundColor: "lightblue",
    fontSize: "16px",
    margin: "10px",
  };

  // Get an array of the keys in the days object
  const dayKeys = Object.keys(days).filter((key) => key !== "default");

  return (
    <div className="DayList">
      {dayKeys &&
        dayKeys.map((dayKey, i) => {
          return (
            <span
              className="dayListEntry"
              style={dayListEntryStyle}
              onClick={() => setCurrentDay(i + 1)}
              key={i}
            >
              Day {i + 1}
            </span>
          );
        })}
    </div>
  );
}
