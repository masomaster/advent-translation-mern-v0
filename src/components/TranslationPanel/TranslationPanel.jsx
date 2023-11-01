import { useEffect, useState } from "react";
import * as translationsAPI from "../../utilities/translations-api";
import { getOfficialTranslations } from "../../utilities/translations-api";

export default function TranslationPanel({
  dayData,
  user,
  currentDay,
  languageIsHebrew,
  setLanguageIsHebrew,
}) {
  /* STATES AND VARIABLES */
  const [translation, setTranslation] = useState("");
  const [officialTranslation, setOfficialTranslation] = useState("");
  const paraBibleLink = `https://parabible.com/${dayData.verse}`;
  const language = languageIsHebrew ? "hebrew" : "greek";

  // /* USE EFFECTS */
  // When day changes, either load any existing translations or clear the form
  useEffect(() => {
    try {
      translationsAPI.getDayTranslations(currentDay).then((translations) => {
        if (translations[language]) setTranslation(translations[language]);
        else setTranslation("");
        setOfficialTranslation("");
      });
    } catch (err) {
      console.log("Error in useEffect: ", err);
    }
  }, [language, currentDay, languageIsHebrew]);

  /* HANDLE FUNCTIONS */
  // Get official translations of Hebrew (this is definitely something that could be made DRY-er)
  async function handleShowOfficialTranslations() {
    try {
      if (!dayData) return;
      const officialTranslationResponse = await getOfficialTranslations(
        dayData.verse
      );
      if (officialTranslationResponse) {
        setOfficialTranslation(officialTranslationResponse);
      } else {
        setOfficialTranslation("");
      }
    } catch (err) {
      console.log("Error in handleShowOfficialTranslations: ", err);
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const dayTranslation = {
        [language]: translation,
        day: currentDay,
        user: user._id,
      };
      const results = await translationsAPI.createTranslations(dayTranslation);
      if (results[language]) setTranslation(results[language]);
      else setTranslation("");
    } catch (err) {
      console.log("Error in handleSubmit: ", err);
    }
  }

  async function handleMoveBackToHebrew(evt) {
    evt.preventDefault();
    try {
      await handleSubmit(evt);
      setLanguageIsHebrew(true);
    } catch (err) {
      console.log("Error in handleMoveBackToHebrew: ", err);
    }
  }

  async function handleMoveToGreek(evt) {
    evt.preventDefault();
    try {
      await handleSubmit(evt);
      setLanguageIsHebrew(false);
    } catch (err) {
      console.log("Error in handleMoveToGreek: ", err);
    }
  }

  return (
    <div>
      <p>{dayData.verse}</p>
      <p>{dayData.text}</p>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label htmlFor="translation">Your translation:</label>
          <input
            type="textarea"
            id="translation"
            name="translation"
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
          />
          <button type="submit">save</button>
        </form>
        <div className="officialTranslation">
          <button onClick={() => handleShowOfficialTranslations()}>
            Show official translations
          </button>
          <p>{officialTranslation} </p>
        </div>
        <div className="paraBibleLink">
          <a href={paraBibleLink} target="_blank" rel="noreferrer">
            Click here for language help at parabible.
          </a>
        </div>
        <div className="progressButtons">
          {languageIsHebrew ? (
            <button onClick={handleMoveToGreek}>Save and Go to Greek!</button>
          ) : (
            <div>
              <button onClick={handleMoveBackToHebrew}>
                Save and Go Back to Hebrew
              </button>
              <button onSubmit={handleSubmit}>Done for the Day!</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
