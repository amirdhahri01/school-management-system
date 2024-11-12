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
    data: teacher,
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
