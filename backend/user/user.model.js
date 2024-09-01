const mongoose = require("mongoose");

const patientHistorySchema = new mongoose.Schema({
  hospitalName: {
    type: String,
    required: false,
  },
  hospitalId: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  prescriptionFile: {
    data: Buffer,
    contentType: {
      type: String,
      enum: ["pdf", "doc", "txt"],
      required: false,
    },
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  aadhaarNumber: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  patientHistory: [patientHistorySchema],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
