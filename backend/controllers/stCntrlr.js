const asyncHandler = require("express-async-handler");
const { validateMongoId } = require("../utils/validMongoDbId");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Stdnt = require("../models/StModel");
const Room = require("../models/roomModel");
const Bed = require("../models/bedModel");
const User = require("../models/userModel");

exports.createStd = asyncHandler(async (req, res) => {
  const { name, email, password, mobile, hostel_id, room_id, bed_id } =
    req.body;

  const room = await Room.findById(room_id);
  if (room.capacity <= room.occupants.length) {
    room.isBooked = true;
    throw new Error("U have reached max limit of this room! ");
  }

  const bed = await Bed.findById(bed_id);
  if (!bed.isAvailable) {
    throw new Error("This bed is already assigned to a student");
  }
  // Check if the user already exists
  let user = await User.findOne({ email });

  if (user) {
    // If the user is already registered, update the isStudent and student_id fields in the user model
    user.isStudent = true;
    user.student_id = req.body.student_id;
    await user.save();

    // Create a new student model with the user ID and other details
    const student = await Stdnt.create(req.body);
    student.user = user._id;

    // Save the new student model
    await student.save();

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

    // Send the success response
    res.status(201).json({ message: "Student added successfully!", student });
  } else {
    // If the user is not registered, create a new user and then create the student model
    const newUser = await User.create(req.body);
    const student = await Stdnt.create(req.body);

    newUser.isStudent = true;
    student.user = newUser._id;

    // Save the new student model
    await newUser.save();
    await student.save();

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

    // Send the success response
    res.status(200).json({ message: "Student added successfully!", student });
  }

  // try {
  //   const room = await Room.findById(room_id);
  //   if (room.capacity <= room.occupants.length) {
  //     room.isBooked = true;
  //     throw new Error("U have reached max limit of this room! ");
  //   }

  //   const bed = await Bed.findById(bed_id);
  //   if (!bed.isAvailable) {
  //     throw new Error("This bed is already assigned to a student");
  //   }
  //   const student = await Stdnt.create(req.body);

  //   try {
  //     await Room.findByIdAndUpdate(room_id, {
  //       $push: { occupants: student._id },
  //     });
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  //   try {
  //     await Bed.findByIdAndUpdate(bed_id, {
  //       $set: { isAvailable: false, student: student._id },
  //     });
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  //   res.status(201).json({ success: true, student });

  //   res.status(201).json(st);
  // } catch (error) {
  //   throw new Error(error.message);
  // }
});

exports.getAllStudents = asyncHandler(async (req, res) => {
  try {
    const count = await Stdnt.countDocuments({});
    const students = await Stdnt.find().populate([
      "hostel_id",
      "room_id",
      "bed_id",
    ]);
    res.status(200).json({ success: true, students, count });
  } catch (error) {
    throw new Error(error.message);
  }
});

exports.loginAsStudent = asyncHandler(async (req, res) => {
  const { student_id, password } = req.body;
  console.log(req.user);
  try {
    const student = await Stdnt.findOne({ student_id });
    console.log(student);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const isValidPassword = await student.comparePassword(password);

    if (!isValidPassword) {
      return res
        .status(400)
        .json({ message: "Invalid student ID or password" });
    }
    // const isMatch = await bcrypt.compare(password, student.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: "Incorrect Credentials " });
    // }

    // const token = jwt.sign(
    //   { studentId: student.student_id },
    //   process.env.JWT_SECRET_KEY
    // );
    // Update user's isStudent property to true
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { student_id: student_id, isStudent: true } },
      { new: true, runValidators: true }
    );
    // console.log(user);
    // await student.save();

    res
      .status(200)
      .json({ success: true, message: "Login as student successfully!", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
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

    await User.findByIdAndUpdate(
      student.user,
      { isStudent: false },
      { new: true, runValidators: true }
    );

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
