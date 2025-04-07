const { GlobalAccelerator } = require("aws-sdk");
const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema({
  fileName: String,
  relativePath: String,
});

const emProfileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //type: String,
      require: true,
      ref: "User",
    },
    companyName: {
      type: String,
    },
    tradeName: {
      type: String,
    },
    companyType: {
      type: String,
    },
    idNumber: {
      type: String,
      //enum: ['RUC', 'RUS']
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    ownershipType: {
      type: String,
    },
    web: {
      type: String,
      //enum: ['RUC', 'RUS']
    },
    teamSize: {
      type: String,
      //enum: ['RUC', 'RUS']
    },
    estSince: {
      type: String,
      //enum: ['RUC', 'RUS']
    },
    country: {
      type: String,
    },
    department: {
      type: String,
    },
    province: {
      type: String,
    },
    address: {
      type: String,
    },
    purpose: {
      type: String,
    },
    goal: {
      type: String,
    },
    description: {
      type: String,
    },

    sector: {
      type: String,
    },
    rating: {
      type: Number,
    },
    logo: [imgSchema],
    cover: [imgSchema],
    gallery: [imgSchema],

    facebook: {
      type: String,
    },
    twitter: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    instagram: {
      type: String,
    },
    youtube: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("EmProfile", emProfileSchema);
