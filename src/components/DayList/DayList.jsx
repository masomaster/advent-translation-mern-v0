import * as days from "../../days.json";

export default function DayList({ user, currentDay, setCurrentDay }) {
  const dayListEntryStyle = {
    backgroundColor: "lightblue",
    fontSize: "16px",
    padding: "10px",
  };

  // Get an array of the keys in the days object
  const dayKeys = Object.keys(days).filter((key) => key !== "default");
  console.log({ dayKeys });

  return (
    <div className="DayList">
      <p>daylist</p>
      <div>
        {dayKeys &&
          dayKeys.map((dayKey, i) => {
            return (
              <span
                className="dayListEntry"
                style={dayListEntryStyle}
                onClick={() => setCurrentDay(i + 1)}
              >
                Day {i + 1}
              </span>
            );
          })}
      </div>
    </div>
  );
}
