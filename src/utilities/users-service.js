// Import all named exports attached to a usersAPI object
// This syntax can be helpful documenting where the methods come from
import * as usersAPI from "./users-api";
import * as profilesAPI from "./profiles-api";

export async function signUp(userData) {
  // Delegate the network request code to the users-api.js API module
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  localStorage.setItem("adventToken", token);
  return getUserProfile();
}

export function getToken() {
  // getItem returns null if there's no string
  const token = localStorage.getItem("adventToken");
  if (!token) return null;
  console.log("token in getToken(): ", token);
  const payload = JSON.parse(atob(token.split(".")[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert
  if (payload.exp < Date.now() / 1000) {
    localStorage.removeItem("adventToken");
    return null;
  }
  return token;
}

export async function getUserProfile() {
  const token = getToken();
  console.log("token in getUserProfile(): ", token);
  const user = token ? JSON.parse(atob(token.split(".")[1])).user : null;
  console.log("this is the user in getUserProfile", user);
  // find one profile in database with userId that matches the user's id
  if (!user) return null;
  console.log("this is the user._id in getUserProfile", user._id);
  const profile = await profilesAPI.getProfile(user._id);
  return profile;
}

export function logOut() {
  localStorage.removeItem("adventToken");
}

export async function login(userData) {
  const token = await usersAPI.login(userData);
  localStorage.setItem("adventToken", token);
  return getUserProfile();
}

export async function checkToken() {
  return usersAPI.checkToken().then((dateStr) => new Date(dateStr));
}
