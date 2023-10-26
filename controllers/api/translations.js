const Translation = require("../../models/translation");

module.exports = {
  create,
  update,
  getDay,
};

async function create(req, res) {
  try {
    // TODO: Check first if a translation already exists for this day and user. If so, run update function instead.
    const existingTranslation = await Translation.findOne({
      day: req.body.day,
      user: req.user._id,
    });
    if (existingTranslation) {
      return update(req, res);
    }
    const dayTranslations = await Translation.create(req.body);
    res.json(dayTranslations);
  } catch (err) {
    res.status(400).json(err);
  }
}

// haven't built this out
async function update(req, res) {
  try {
    const filter = { day: req.body.day, user: req.user._id };
    const update = {};
    if (req.body?.hebrewTranslation) {
      update.hebrewTranslation = req.body.hebrewTranslation;
    }
    if (req.body?.greekTranslation) {
      update.greekTranslation = req.body.greekTranslation;
    }
    const dayTranslations = await Translation.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.json(dayTranslations);
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
