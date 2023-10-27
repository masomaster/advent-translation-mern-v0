import { useEffect, useState } from "react";
import * as translationsAPI from "../../utilities/translations-api";
import * as days from "../../days.json";

export default function DayTranslations({ user, currentDay, setCurrentDay }) {
  /* STATES AND VARIABLES */
  const [hebrewTranslation, setHebrewTranslation] = useState("");
  const [greekTranslation, setGreekTranslation] = useState("");
  const dayVerses = days[currentDay];
  const numOfDays = Object.keys(days).filter((key) => key !== "default").length;

  // /* USE EFFECTS */
  // When day changes, either load any existing translations or clear the form
  useEffect(() => {
    translationsAPI.getDayTranslations(currentDay).then((translations) => {
      if (translations) {
        setHebrewTranslation(translations.hebrewTranslation);
        setGreekTranslation(translations.greekTranslation);
      } else {
        // Handle the case where translations are not available
        setHebrewTranslation("");
        setGreekTranslation("");
      }
    });
  }, [currentDay]);

  /* HANDLE FUNCTIONS */
  function handleIncrement() {
    if (currentDay < numOfDays) {
      setCurrentDay(currentDay + 1);
    } else {
      // Do nothing or handle the case where the maximum value is reached
    }
  }

  function handleDecrement() {
    if (currentDay > 1) {
      setCurrentDay(currentDay - 1);
    } else {
      // Do nothing or handle the case where the minimum value is reached
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const dayTranslations = {
        hebrewTranslation: hebrewTranslation,
        greekTranslation: greekTranslation,
        day: currentDay,
        user: user._id,
      };

      const results = await translationsAPI.createTranslations(dayTranslations);

      // const newHebrewTranslation = results.hebrewTranslation;
      // console.log({ newHebrewTranslation });
      // const newGreekTranslation = results.greekTranslation;
      // console.log({ newGreekTranslation });
      // setHebrewTranslation(newHebrewTranslation);
      // setGreekTranslation(newGreekTranslation);
    } catch (err) {
      console.log("Error in handleSubmit: ", err);
    }
  }
  return (
    <div>
      <p>{dayVerses.hebrewVerse}</p>
      <p>{dayVerses.hebrewText}</p>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="hebrewTranslation">Your translation:</label>
          <input
            type="textarea"
            id="hebrewTranslation"
            name="hebrewTranslation"
            value={hebrewTranslation}
            onChange={(e) => setHebrewTranslation(e.target.value)}
          />
        </form>
      </div>
      <p>{dayVerses.greekVerse}</p>
      <p>{dayVerses.greekText}</p>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="greekTranslation">Your translation:</label>
          <input
            type="textarea"
            id="greekTranslation"
            name="greekTranslation"
            value={greekTranslation}
            onChange={(e) => setGreekTranslation(e.target.value)}
          />
          <button type="submit">save</button>
        </form>
        <button onClick={() => handleDecrement()}>previous day</button>
        <button onClick={() => handleIncrement()}>next day</button>
      </div>
    </div>
  );
}
