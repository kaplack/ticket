const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  educLevel: { type: String, required: true },
  institute: { type: String, required: true },
  iyear: { type: Number, required: true },
  fyear: { type: Number, required: true },
  currentEducation: { type: Boolean, required: true },
});

const experienceSchema = new Schema({
  // Define los campos de experiencia aquí
  organization: { type: String, required: true },
  designation: { type: String, required: true },
  idate: { type: Date, required: true },
  fdate: { type: Date, required: true },
  description: { type: String, required: true },
  currentWork: { type: Boolean },
});

const cv_fileSchema = new Schema(
  {
    // Define los campos del CV aquí
    fileName: String,
    relativePath: String,
  },
  { timestamps: true }
);

const canResumeSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    skills: {
      type: [String],
    },
    education: [educationSchema],
    experiences: [experienceSchema],
    cv_file: [cv_fileSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CanResume", canResumeSchema);
