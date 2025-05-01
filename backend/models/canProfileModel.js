const mongoose = require("mongoose");

const socialSchema = new mongoose.Schema({
  platform: String,
  url: String,
});

const canProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //type: String,
      require: true,
      ref: "Users",
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    tipoDoc: {
      type: String,
    },
    doc: {
      type: String,
    },
    phone: {
      type: String,
      require: true,
    },
    lang: {
      type: [String],
    },
    nationality: {
      type: String,
    },
    genre: {
      type: String,
    },
    age: {
      type: Date,
    },
    disability: {
      type: String,
    },
    diagnosis: {
      type: String,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    address: {
      type: String,
    },
    nivEduc: {
      type: String,
    },
    experience: {
      type: String,
    },
    professionalProfile: {
      type: String,
    },
    socials: [socialSchema],
    profilePicture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CanProfile", canProfileSchema);
