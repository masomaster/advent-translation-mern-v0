const Profile = require("../../models/profile");

module.exports = {
  create,
};

async function create(req, res) {
  try {
    const user = await Profile.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}
