// models/Application.js
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users", // asumiendo que tienes una colección 'users'
      required: true,
    },
    workId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Works", // asumiendo que tienes una colección 'jobs'
      required: true,
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true, // crea automáticamente createdAt y updatedAt
  }
);

module.exports = mongoose.model("Application", applicationSchema);
