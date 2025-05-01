const mongoose = require("mongoose");

const workSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //type: String,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    jobCategory: {
      type: String,
      require: true,
    },
    workTime: {
      type: String,
      require: true,
    },
    workWay: {
      type: String,
      require: true,
    },
    experience: {
      type: String,
      require: true,
    },
    qualification: {
      type: String,
      require: true,
    },
    workPay: {
      type: Number,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    workPlace: {
      type: String,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
      require: true,
    },
    contactMail: {
      type: String,
      require: true,
    },
    iDate: {
      type: Date,
      require: true,
    },
    fDate: {
      type: Date,
      require: true,
    },
    workFunctions: {
      type: String,
      require: true,
    },
    workRequire: {
      type: String,
      require: true,
    },
    actTime: {
      type: Date,
      require: true,
    },
    workStatus: {
      type: String,
      require: true,
      enum: ["borrador", "publicado", "evaluando", "resultado"],
    },
    active: {
      type: Boolean,
    },
    views: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Works", workSchema);
