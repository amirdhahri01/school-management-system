import asyncHandler from "express-async-handler";
import AcademicTerm from "../../models/Academic/AcademicTerm.js";
import Admin from "../../models/Staff/Admin.js";

/**
 *@description Create academic term controller
 *@Route POST /api/v1/academic-terms
 *@access Private
 */
export const createAcademicTermCtrl = asyncHandler(async (req, res) => {
  const { name, description, duration } = req.body;
  const academicTermFound = await AcademicTerm.findOne({ name });
  if (academicTermFound) {
    throw new Error("Academic term already exists");
  }
  const academicTerm = await AcademicTerm.create({
    name,
    description,
    duration,
    createdBy: req.userAuth?._id,
  });
  const admin = await Admin.findById(req.userAuth?._id);
  admin.academicTerms.push(academicTerm._id);
  admin.save();
  res.status(201).send({
    status: "Success",
    messagge: "Academic term created successfully",
    data: {
      academicTerm,
    },
  });
});

/**
 *@description Fetch academic terms controller
 *@Route GET /api/v1/academic-terms
 *@access Private
 */
export const getAcademicTermsCtrl = asyncHandler(async (req, res) => {
  const academicTerms = await AcademicTerm.find();
  res.status(200).send({
    status: "Success",
    messagge: "Academic Terms fetched successfully",
    data: {
      academicTerms,
    },
  });
});

/**
 *@description Fetch academic term controller
 *@Route GET /api/v1/academic-terms/:id
 *@access Private
 */
export const getAcademicTermCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const academicTerm = await AcademicTerm.findById(id);
  res.status(200).send({
    status: "Success",
    messagge: "Academic term fetched successfully",
    data: {
      academicTerm,
    },
  });
});

/**
 *@description Update academic term controller
 *@Route PUT /api/v1/academic-terms/:id
 *@access Private
 */
export const updateAcademicTermCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, duration } = req.body;
  const academicTermFound = await AcademicTerm.findById(id);
  if (!academicTermFound) {
    throw new Error("Academic term doesn't exists");
  }
  const academicTerm = await AcademicTerm.findByIdAndUpdate(
    id,
    {
      name,
      description,
      duration,
      createdBy: req.userAuth?._id,
    },
    {
      new: true,
    }
  );
  res.status(200).send({
    status: "Success",
    messagge: "Academic term updated successfully",
    data: {
      academicTerm,
    },
  });
});

/**
 *@description Delete academic term controller
 *@Route DELETE /api/v1/academic-terms/:id
 *@access Private
 */
export const deleteAcademicTermCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const academicTerm = await AcademicTerm.findByIdAndDelete(id, { new: true });
  res.status(200).send({
    status: "Success",
    messagge: "Academic term fetched successfully",
    data: {
      academicTerm,
    },
  });
});
