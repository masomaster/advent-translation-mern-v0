import sendRequest from "./send-request";
// This is the base path of the Express route we'll define
const BASE_URL = "/translations";

export async function createTranslations(dayTranslations) {
  return sendRequest(BASE_URL, "POST", dayTranslations);
}

export async function getDayTranslations(day) {
  return sendRequest(`${BASE_URL}/${day}`, "GET");
}
