const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const translationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    greekTranslation: String,
    hebrewTranslation: String,
    day: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Translation", translationSchema);
