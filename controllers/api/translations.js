const Translation = require("../../models/translation");

module.exports = {
  create,
  update,
  getDay,
};

async function create(req, res) {
  try {
    console.log("req.user", req.user);
    console.log("req.body", req.body);
    console.log("req.profile", req.profile);

    // TODO: Check first if a translation already exists for this day and user. If so, run update function instead.

    const dayTranslations = await Translation.create(req.body);
    res.json(dayTranslations);
  } catch (err) {
    res.status(400).json(err);
  }
}

// haven't built this out
async function update(req, res) {
  try {
    const user = await Translation.findOneAndUpdate(req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
}

// Not sure if this work yet. Should make a POST first. Also, not sure how to get profile ID in here, since it can't have a body.
async function getDay(req, res) {
  try {
    const dayTranslations = await Translation.findOne(
      { day: req.params.id },
      { id: req.body.id }
    );
    res.json(dayTranslations);
  } catch (err) {
    res.status(400).json(err);
  }
}
