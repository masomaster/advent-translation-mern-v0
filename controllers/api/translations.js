const Translation = require("../../models/translation");

module.exports = {
  create,
  update,
  getDayTranslations,
};

async function create(req, res) {
  try {
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

async function update(req, res) {
  try {
    const filter = { day: req.body.day, user: req.user._id };
    const dayTranslations = await Translation.findOneAndUpdate(
      filter,
      req.body,
      {
        new: true,
      }
    );
    res.json(dayTranslations);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function getDayTranslations(req, res) {
  try {
    const dayTranslations = await Translation.findOne({
      day: req.params.id,
      user: req.user._id,
    });
    res.json(dayTranslations);
  } catch (err) {
    res.status(400).json(err);
  }
}
