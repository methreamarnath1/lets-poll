const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    options: {
      type: [
        {
          text: {
            type: String,
            required: [true, "Option text is required"],
            trim: true,
          },
          votes: {
            type: Number,
            default: 0,
          },
        },
      ],
      validate: [
        {
          validator: function (value) {
            return value.length >= 2;
          },
          message: "At least two options are required",
        },
        {
          validator: function (value) {
            return value.length <= 4;
          },
          message: "Maximum four options are allowed",
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

const poll = mongoose.model("poll", pollSchema);

module.exports = poll;
