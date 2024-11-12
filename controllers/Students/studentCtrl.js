import asyncHandler from "express-async-handler";
import Teacher from "../../models/Staff/Teacher.js";
import { hashPassword, isPasswordMatch } from "../../utils/helpers.js";
import generateToken from "../../utils/generateToken.js";
import Student from "../../models/Staff/Student.js";

/**
 *@description Admin register student controller
 *@Route POST /api/v1/students/admin/register
 *@access Private - Admin Only
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
 *@access Private - Admin Only
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
 *@access Private - Admin Only
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
 *@access Private - Student Only
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
 *@access Private - Student Only
 */
export const updateStudentProfileCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
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
    { email, password: hashedPassword },
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
 *@access Private - Admin Only
 */
export const adminUpdateStudentProfileCtrl = asyncHandler(async (req, res) => {
  const { classLevels, academicYear, program, name, email, prefectName } =
    req.body;
  const { studentID } = req.params;
  const studentFound = Student.findById(studentID);
  if (!studentFound) {
    throw new Error("Student not found");
  }
  const student = Student.findByIdAndUpdate(
    studentID,
    {
      $set: { academicYear, program, name, email, prefectName },
      $addToSet: { classLevels },
    },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Student profile updated successfully",
    data: {
      student,
    },
  });
});
