import sendRequest from "./send-request";
// This is the base path of the Express route we'll define
const BASE_URL = "/api/profiles";

export function getProfile(userId) {
  console.log("this is the userId in getProfile profiles-api", userId);
  return sendRequest(`${BASE_URL}/find`, "POST", userId);
}

export function addProfile(credentials) {
  return sendRequest(`${BASE_URL}/`, "POST", credentials);
}
