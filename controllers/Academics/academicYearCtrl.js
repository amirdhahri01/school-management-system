import asyncHandler from "express-async-handler";
import AcademicYear from "../../models/Academic/AcademicYear.js";
import Admin from "../../models/Staff/Admin.js";

/**
 *@description Create academic year controller
 *@Route POST /api/v1/academic-years
 *@access Private
 */
export const createAcademicYearCtrl = asyncHandler(async (req, res) => {
  const { name, fromYear, toYear } = req.body;
  const academicYearFound = await AcademicYear.findOne({ name });
  if (academicYearFound) {
    throw new Error("Academic year already exists");
  }
  const academicYear = await AcademicYear.create({
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth?._id,
  });
  const admin = await Admin.findById(req.userAuth?._id);
  admin.academicYears.push(academicYear._id);
  admin.save();
  res.status(201).send({
    status: "Success",
    messagge: "Academic year created successfully",
    data: {
      academicYear,
    },
  });
});

/**
 *@description Fetch academic years controller
 *@Route GET /api/v1/academic-years
 *@access Private
 */
export const getAcademicYearsCtrl = asyncHandler(async (req, res) => {
  const academicYears = await AcademicYear.find();
  res.status(200).send({
    status: "Success",
    messagge: "Academic years fetched successfully",
    data: {
      academicYears,
    },
  });
});

/**
 *@description Fetch academic year controller
 *@Route GET /api/v1/academic-years/:id
 *@access Private
 */
export const getAcademicYearCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const academicYear = await AcademicYear.findById(id);
  res.status(200).send({
    status: "Success",
    messagge: "Academic year fetched successfully",
    data: {
      academicYear,
    },
  });
});

/**
 *@description Update academic year controller
 *@Route PUT /api/v1/academic-years/update/:id
 *@access Private
 */
export const updateAcademicYearCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, fromYear, toYear } = req.body;
  const academicYearFound = await AcademicYear.findById(id);
  if (!academicYearFound) {
    throw new Error("Academic year doesn't exists");
  }
  const academicYear = await AcademicYear.findByIdAndUpdate(
    id,
    {
      name,
      fromYear,
      toYear,
      createdBy: req.userAuth?._id,
    },
    {
      new: true,
    }
  );
  res.status(200).send({
    status: "Success",
    messagge: "Academic year updated successfully",
    data: {
      academicYear,
    },
  });
});

/**
 *@description Delete academic year controller
 *@Route DELETE /api/v1/academic-years/delete/:id
 *@access Private
 */
export const deleteAcademicYearCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const academicYear = await AcademicYear.findByIdAndDelete(id, { new: true });
  res.status(200).send({
    status: "Success",
    messagge: "Academic year fetched successfully",
    data: {
      academicYear,
    },
  });
});
