const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  parentContactNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
    unique: true,
  },
  room_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  bed_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bed",
    required: true,
  },
  hostel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hostel",
    required: true,
  },
  checkInDate: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  checkOutDate: {
    type: Date,
  },
  // whether a student is using the bed or not
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Stdnt", studentsSchema);
