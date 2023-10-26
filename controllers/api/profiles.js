const Profile = require("../../models/profile");

module.exports = {
  create,
  getProfile,
};

async function create(req, res) {
  console.log("got to create function in profiles controller");
  try {
    const user = await Profile.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getProfile(req, res) {
  console.log(
    "This is the req in the getProfile function in the profiles controller",
    req
  );
  try {
    const profile = await Profile.findOne({ userId: req.userId }); // TODO: can this just use req.user._id instead of needing to pass in the id? Then I can convert to GET not POST.
    res.json(profile);
  } catch (err) {
    res.status(400).json(err);
  }
}
