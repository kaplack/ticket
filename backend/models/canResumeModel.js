const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const educationSchema = new Schema({
  educLevel: { type: String, required: true },
  institute: { type: String, required: true },
  iyear: { type: Number, required: true },
  fyear: { type: Number, required: true },
  currentEducation: { type: String, required: true }
});

const experienceSchema = new Schema({
  // Define los campos de experiencia aquí
  organization: { type: String, required: true },
  designation: { type: String, required: true },
  idate: { type: Date, required: true },
  fdate: { type: Date, required: true },
  description: { type: String, required: true },
  currentWork: { type: Boolean }
});



const canResumeSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  skills: {
    type: [String]
  },
  education: [educationSchema],
  experiences: [experienceSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('CanResume', canResumeSchema);
