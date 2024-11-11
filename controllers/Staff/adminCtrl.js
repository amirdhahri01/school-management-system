import asyncHandler from "express-async-handler";
import Admin from "../../models/Staff/Admin.js";

/**
 *@description Get admins controller
 *@Route GET /api/v1/admins
 *@access
 */
export const getAdminsCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
  });
});

/**
 *@description Get admin controller
 *@Route GET /api/v1/admins/:id
 *@access
 */
export const getAdminCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
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
  const user = await Admin.create({ name, email, password });
  res.status(201).json({
    status: "Success",
    message: "Admin registered successfully",
    user,
  });
});

/**
 *@description Login admin
 *@Route POST /api/v1/admins/login
 *@access
 */
export const loginAdminCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
  });
});

/**
 *@description Update admin
 *@Route PUT /api/v1/admins/update/:id
 *@access
 */
export const updateAdminCtrl = asyncHandler(async (req, res) => {
  res.status(201).json({
    message: "Admin created",
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
