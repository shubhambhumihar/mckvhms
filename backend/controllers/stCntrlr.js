const asyncHandler = require("express-async-handler");
const { validateMongoId } = require("../utils/validMongoDbId");
const Stdnt = require("../models/StModel");
const Room = require("../models/roomModel");
const Bed = require("../models/bedModel");

exports.createStd = asyncHandler(async (req, res) => {
  const { hostel_id, room_id, bed_id } = req.body;
  try {
    const room = await Room.findById(room_id);
    if (room.capacity <= room.occupants.length) {
      room.isBooked = true;
      throw new Error("U have reached max limit of this room! ");
    }

    const bed = await Bed.findById(bed_id);
    if (!bed.isAvailable) {
      throw new Error("This bed is already assigned to a student");
    }
    const student = await Stdnt.create(req.body);

    try {
      await Room.findByIdAndUpdate(room_id, {
        $push: { occupants: student._id },
      });
    } catch (error) {
      throw new Error(error.message);
    }
    try {
      await Bed.findByIdAndUpdate(bed_id, {
        $set: { isAvailable: false, student: student._id },
      });
    } catch (error) {
      throw new Error(error.message);
    }
    res.status(201).json({ success: true, student });

    res.status(201).json(st);
  } catch (error) {
    throw new Error(error.message);
  }
});

exports.getAllStudents = asyncHandler(async (req, res) => {
  try {
    const count = await Stdnt.countDocuments({});
    const students = await Stdnt.find();
    res.status(200).json({ success: true, students, count });
  } catch (error) {
    throw new Error(error.message);
  }
});

exports.getSingleStudent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);
    const student = await Stdnt.findById(id);
    if (!student) {
      throw new Error(`Student ${id} not found`);
    } else {
      res.status(200).json({ success: true, student });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

exports.updateStudent = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoId(id);
    const studentToUpdate = await Stdnt.findById(id);

    if (!studentToUpdate) throw new Error("Student not found");

    const student = await Stdnt.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, student });
  } catch (error) {
    throw new Error(error.message);
  }
});

exports.deleteStudent = asyncHandler(async (req, res) => {
  // const room_id = req.params.roomId;
  try {
    const { id } = req.params;
    validateMongoId(id);

    const student = await Stdnt.findByIdAndDelete(id);
    if (!student) throw new Error("Student not found");
    //! search room by id and update student into that room

    const room = await Room.findByIdAndUpdate(
      student.room_id,
      {
        $pull: { occupants: student._id },
      },
      { new: true }
    );

    if (!room) {
      return res.status(500).json({ message: "Room not found" });
    }

    const bed = await Bed.findByIdAndUpdate(
      student.bed_id,
      { $set: { student: null, isAvailable: true } },
      { new: true }
    );

    if (!bed) {
      return res.status(500).json({ message: "Bed not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Student deleted successfully" });
  } catch (error) {
    throw new Error(error.message);
  }
});
