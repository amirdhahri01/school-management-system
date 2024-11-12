import asyncHandler from "express-async-handler";
import Teacher from "../../models/Staff/Teacher.js";
import { hashPassword, isPasswordMatch } from "../../utils/helpers.js";
import generateToken from "../../utils/generateToken.js";

/**
 *@description Admin register teacher controller
 *@Route POST /api/v1/teachers/admin/register
 *@access Private
 */
export const adminRegisterTeacher = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const teacherFound = await Teacher.findOne({ email });
  if (teacherFound) {
    throw new Error("Teacher already exists");
  }
  const hasedPassword = await hashPassword(password);
  const teacher = await Teacher.create({
    name,
    email,
    password: hasedPassword,
  });
  res.status(201).json({
    status: "Success",
    message: "Teacher registered successfully",
    data: {
      teacher,
    },
  });
});

/**
 *@description Login teacher
 *@Route POST /api/v1/teachers/login
 *@access Private
 */
export const loginTeacherCtrl = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const teacherFound = await Teacher.findOne({ email });
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }
  const isMatched = await isPasswordMatch(password, teacherFound.password);
  if (!isMatched) {
    throw new Error("Invalid login credentials");
  }
  req.authUser = teacherFound;
  const token = generateToken(teacherFound._id);
  res.status(200).json({
    status: "Success",
    message: "Teacher logged in successfully",
    data: {
      token,
    },
  });
});

/**
 *@description Get teachers
 *@Route GET /api/v1/teachers/admin
 *@access Private admin only
 */
export const getTeachersCtrl = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find();
  res.status(200).json({
    status: "Success",
    message: "Teachers fetched sucessfully",
    data: {
      teachers,
    },
  });
});

/**
 *@description Get teacher
 *@Route GET /api/v1/teachers/admin/:teacherID
 *@access Private admin only
 */
export const getTeacherCtrl = asyncHandler(async (req, res) => {
  const { teacherID } = req.params;
  const teacher = await Teacher.findById(teacherID);
  res.status(200).json({
    status: "Success",
    message: "Teacher fetched sucessfully",
    data: {
      teacher,
    },
  });
});

/**
 *@description Get teacher profile
 *@Route GET /api/v1/teachers/profile
 *@access Private teacher only
 */
export const getTeacherProfileCtrl = asyncHandler(async (req, res) => {
  const teacherProfile = await Teacher.findById(req.userAuth?._id).select(
    "-password -createdAt -updatedAt"
  );
  if (!teacherProfile) {
    throw new Error("Teacher doesn't exists");
  }
  res.status(200).json({
    status: "Success",
    message: "Teacher profile fetched sucessfully",
    data: {
      teacherProfile,
    },
  });
});

/**
 *@description Teacher update profile controller
 *@Route PUT /api/v1/teachers/update
 *@access Private teacher only
 */
export const updateTeacherProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const teacherFound = await Teacher.findOne(email);
  if (!teacherFound) {
    throw new Error("This email is taken/exists");
  }
  const hashedPassword = "";
  if (password) {
    hashedPassword = await hashPassword(password);
  }
  const teacher = await Teacher.findByIdAndUpdate(
    req.userAuth._id,
    { name, email, password: hashedPassword },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "Success",
    message: "Teacher profile updated successfully",
    data: {
      teacher,
    },
  });
});

/**
 *@description Admin update teacher profile controller
 *@Route PUT /api/v1/teachers/admin/update/:teacherID
 *@access Private admin only
 */
export const adminUpdateTeacherProfile = asyncHandler(async (req, res) => {
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
