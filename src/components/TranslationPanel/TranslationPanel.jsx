import { useEffect, useState } from "react";
import * as translationsAPI from "../../utilities/translations-api";
import { getOfficialTranslations } from "../../utilities/translations-api";

export default function TranslationPanel({
  dayData,
  user,
  currentDay,
  language,
}) {
  /* STATES AND VARIABLES */
  const [translation, setTranslation] = useState("");
  const [officialTranslation, setOfficialTranslation] = useState("");
  const paraBibleLink = `https://parabible.com/${dayData.verse}`;
  const OLTranslationKey = `${language}Translation`;

  // /* USE EFFECTS */
  // When day changes, either load any existing translations or clear the form
  useEffect(() => {
    translationsAPI.getDayTranslations(currentDay).then((translations) => {
      if (translations) {
        setTranslation(translations[OLTranslationKey]);
      } else {
        setTranslation("");
      }
      setOfficialTranslation("");
    });
  }, [OLTranslationKey, currentDay, language]);

  /* HANDLE FUNCTIONS */
  // Get official translations of Hebrew (this is definitely something that could be made DRY-er)
  async function handleShowOfficialTranslations() {
    if (!dayData) return;
    const officialTranslationResponse = await getOfficialTranslations(
      dayData.verse
    );
    if (officialTranslationResponse) {
      setOfficialTranslation(officialTranslationResponse);
    } else {
      setOfficialTranslation("");
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const dayTranslation = {
        [OLTranslationKey]: translation,
        day: currentDay,
        user: user._id,
      };
      console.log(
        "This may be a problem with the template literal: dayTranslation in handleSubmit: ",
        dayTranslation
      );
      const results = await translationsAPI.createTranslations(dayTranslation);
      setTranslation(results[OLTranslationKey]);
    } catch (err) {
      console.log("Error in handleSubmit: ", err);
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
      </div>
    </div>
  );
}
