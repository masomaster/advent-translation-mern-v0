const User = require("../../models/user");
const Profile = require("../../models/profile");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  create,
  login,
  checkToken,
};

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    // Create new profile for user using userID
    const { firstName, lastName, email, id } = user;
    const profileData = {
      userId: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      latestDay: 1,
      preferredTranslation: "NIV",
    };
    const profile = await Profile.create(profileData);
    const token = createJWT(user);
    res.json(token);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const profile = await Profile.findOne({ userId: user._id });
    const token = createJWT(user);
    res.json(token); // TODO: I think this is where I want to ALSO return the profile in the response so I can set it as state.
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}
