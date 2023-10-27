import { useState } from "react";
import { createTranslations } from "../../utilities/translations-api";
import * as days from "../../days.json";

export default function DayTranslations({ user, currentDay, setCurrentDay }) {
  const dayVerses = days[currentDay];
  const numOfDays = Object.keys(days).filter((key) => key !== "default").length;

  const [hebrewForm, setHebrewForm] = useState({
    hebrewTranslation: "",
  });
  const [greekForm, setGreekForm] = useState({
    greekTranslation: "",
  });

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

  function handleHebrewChange(evt) {
    const newFormData = {
      ...hebrewForm,
      [evt.target.name]: evt.target.value,
    };
    setHebrewForm(newFormData);
  }

  function handleGreekChange(evt) {
    const newFormData = {
      ...greekForm,
      [evt.target.name]: evt.target.value,
    };
    setGreekForm(newFormData);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const dayTranslations = {
        ...hebrewForm,
        ...greekForm,
        day: currentDay,
        user: user._id,
      };
      if (dayTranslations.hebrewTranslation === "") {
        delete dayTranslations.hebrewTranslation;
      }
      if (dayTranslations.greekTranslation === "") {
        delete dayTranslations.greekTranslation;
      }
      if (
        dayTranslations.hebrewTranslation ||
        dayTranslations.greekTranslation
      ) {
        const results = await createTranslations(dayTranslations);
      }
      // const newHebrewTranslation = results.hebrewTranslation;
      // console.log({ newHebrewTranslation });
      // const newGreekTranslation = results.greekTranslation;
      // console.log({ newGreekTranslation });
      // setHebrewForm(newHebrewTranslation);
      // setGreekForm(newGreekTranslation);
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
            value={hebrewForm.hebrewTranslation}
            onChange={handleHebrewChange}
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
            value={greekForm.greekTranslation}
            onChange={handleGreekChange}
          />
          <button type="submit">save</button>
        </form>
        <button onClick={() => handleDecrement()}>previous day</button>
        <button onClick={() => handleIncrement()}>next day</button>
      </div>
    </div>
  );
}
