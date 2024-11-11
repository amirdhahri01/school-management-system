import asyncHandler from "express-async-handler";
import Admin from "../../models/Staff/Admin.js";
import generateToken from "../../utils/generateToken.js";
import { hashPassword, isPasswordMatch } from "../../utils/helpers.js";

/**
 *@description Get admins controller
 *@Route GET /api/v1/admins
 *@access
 */
export const getAdminsCtrl = asyncHandler(async (req, res) => {
  const admins = await Admin.find();
  res.status(200).json({
    status: "Success",
    message: "Admins featched successfully",
    data: {
      admins,
    },
  });
});

/**
 *@description Get admin profile controller
 *@Route GET /api/v1/admins/profile
 *@access
 */
export const getAdminProfileCtrl = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.userAuth._id)
    .select("-password")
    .populate("academicYears")
    .populate("academicTerms");
  if (!admin) {
    throw new Error("Admin not found");
  }
  res.json({
    status: "Success",
    message: "Admin profile fetched successfully",
    data: admin,
  });
});

/**
 *@description Register admin controller
 *@Route POST /api/v1/admins/register
 *@access Private
 */
export const registerAdminCtrl = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const adminFound = await Admin.findOne({ email });
  if (adminFound) {
    throw new Error("Admin already exists");
  }
  const hasedPassword = hashPassword(password);
  const user = await Admin.create({
    name,
    email,
    password: hasedPassword,
  });
  res.status(201).json({
    status: "Success",
    message: "Admin registered successfully",
    data: user,
  });
});

/**
 *@description Login admin
 *@Route POST /api/v1/admins/login
 *@access Private
 */
export const loginAdminCtrl = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const userFound = await Admin.findOne({ email });
  if (!userFound) {
    throw new Error("User not found");
  }
  if (!isPasswordMatch(userFound.password, password)) {
    throw new Error("Invalid login credentials");
  }
  req.authUser = userFound;
  const token = generateToken(userFound._id);
  res.status(200).json({
    status: "Success",
    message: "User logged in successfully",
    data: {
      token,
    },
  });
});

/**
 *@description Update admin
 *@Route PUT /api/v1/admins/update
 *@access
 */
export const updateAdminCtrl = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;
  const emailExists = await Admin.findOne({ email });
  if (emailExists) {
    throw new Error("This email is taken/exists");
  }
  const hasedPassword = hashPassword(password);
  const admin = await Admin.findByIdAndUpdate(
    req.userAuth._id,
    { email, name, password: hasedPassword },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Admin updated successfully",
    data: {
      admin,
    },
  });
});

/**
 *@description Admin suspend teacher controller
 *@Route PUT /api/v1/admins/suspend/teacher/:id
 *@access
 */
export const adminSuspendTeacherCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
  });
});

/**
 *@description Admin unsuspend teacher controller
 *@Route PUT /api/v1/admins/unsuspend/teacher/:id
 *@access
 */
export const adminUnsuspendTeacherCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
  });
});

/**
 *@description Admin withdraw teacher controller
 *@Route PUT /api/v1/admins/withdraw/teacher/:id
 *@access
 */
export const adminWithdrawTeacherCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
  });
});

/**
 *@description Admin withdraw teacher controller
 *@Route PUT /api/v1/admins/unwithdraw/teacher/:id
 *@access
 */
export const adminUnwithdrawTeacherCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
  });
});

/**
 *@description Admin publish exam controller
 *@Route PUT /api/v1/admins/publish/exam/:id
 *@access
 */
export const adminPublishExamCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
  });
});

/**
 *@description Admin unpublish exam controller
 *@Route PUT /api/v1/admins/unpublish/exam/:id
 *@access
 */
export const adminUnpublishExamCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
  });
});

/**
 *@description Delete admin
 *@Route DELETE /api/v1/admins/delete/:id
 *@access
 */
export const deleteAdminCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
  });
});
