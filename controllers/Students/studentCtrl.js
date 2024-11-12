import asyncHandler from "express-async-handler";
import Teacher from "../../models/Staff/Teacher.js";
import { hashPassword, isPasswordMatch } from "../../utils/helpers.js";
import generateToken from "../../utils/generateToken.js";
import Student from "../../models/Staff/Student.js";

/**
 *@description Admin register student controller
 *@Route POST /api/v1/students/admin/register
 *@access Private
 */
export const adminRegisterStudentCtrl = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const studentFound = await Student.findOne({ email });
  if (studentFound) {
    throw new Error("Student already exists");
  }
  const hasedPassword = await hashPassword(password);
  const student = await Student.create({
    name,
    email,
    password: hasedPassword,
  });
  res.status(201).json({
    status: "Success",
    message: "Student registered successfully",
    data: {
      student,
    },
  });
});

/**
 *@description Login student
 *@Route POST /api/v1/students/login
 *@access Public
 */
export const loginStudentCtrl = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const studentFound = await Student.findOne({ email });
  if (!studentFound) {
    throw new Error("Student not found");
  }
  const isMatched = await isPasswordMatch(password, studentFound.password);
  if (!isMatched) {
    throw new Error("Invalid login credentials");
  }
  const token = generateToken(studentFound._id);
  res.status(200).json({
    status: "Success",
    message: "Student logged in successfully",
    data: {
      token,
    },
  });
});

/**
 *@description Get students
 *@Route GET /api/v1/students/admin
 *@access Private admin only
 */
export const getStudentsCtrl = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json({
    status: "Success",
    message: "Students fetched sucessfully",
    data: {
      students,
    },
  });
});

/**
 *@description Get student
 *@Route GET /api/v1/students/admin/:studentID
 *@access Private admin only
 */
export const getStudentCtrl = asyncHandler(async (req, res) => {
  const { studentID } = req.params;
  const student = await Student.findById(studentID);
  res.status(200).json({
    status: "Success",
    message: "Student fetched sucessfully",
    data: {
      student,
    },
  });
});

/**
 *@description Get student profile
 *@Route GET /api/v1/students/profile
 *@access Private student only
 */
export const getStudentProfileCtrl = asyncHandler(async (req, res) => {
  const studentProfile = await Student.findById(req.userAuth?._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!studentProfile) {
    throw new Error("Student doesn't exists");
  }
  res.status(200).json({
    status: "Success",
    message: "Student profile fetched sucessfully",
    data: {
      studentProfile,
    },
  });
});

/**
 *@description Student update profile controller
 *@Route PUT /api/v1/students/update
 *@access Private student only
 */
export const updateStudentProfileCtrl = asyncHandler(async (req, res) => {
  const {email, password } = req.body;
  const studentFound = await Student.findOne(email);
  if (!studentFound) {
    throw new Error("This email is taken/exists");
  }
  const hashedPassword = "";
  if (password) {
    hashedPassword = await hashPassword(password);
  }
  const student = await Student.findByIdAndUpdate(
    req.userAuth._id,
    {  email, password: hashedPassword },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "Success",
    message: "Student profile updated successfully",
    data: {
      student,
    },
  });
});

/**
 *@description Admin update student profile controller
 *@Route PUT /api/v1/students/admin/update/:studentID
 *@access Private admin only
 */
export const adminUpdateTeacherProfileCtrl = asyncHandler(async (req, res) => {
  const { teacherID } = req.params;
  const { program, classLevel, academicYear, subject } = req.body;
  const teacherFound = await Teacher.findById(teacherID);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }
  if (teacherFound.isWitdrawn) {
    throw new Error("Action denied, teacher is withdraw");
  }
  if (program) {
    teacherFound.program = program;
    await teacherFound.save();
  }
  if (classLevel) {
    teacherFound.classLevel = classLevel;
    await teacherFound.save();
  }
  if (academicYear) {
    teacherFound.academicYear = academicYear;
    await teacherFound.save();
  }
  if (subject) {
    teacherFound.subject = subject;
    await teacherFound.save();
  }
  res.status(200).json({
    status: "Success",
    message: "Teacher profile updated successfully",
    data: {
      teacherFound,
    },
  });
});
