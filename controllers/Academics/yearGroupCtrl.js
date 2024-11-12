import asyncHandler from "express-async-handler";
import YearGroup from "../../models/Academic/YearGroup.js";
import Admin from "../../models/Staff/Admin.js";

/**
 *@description Create year group controller
 *@Route POST /api/v1/year-groups
 *@access Private
 */
export const createYearGroupCtrl = asyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;
  const yearGroupFound = await YearGroup.findOne({ name });
  if (yearGroupFound) {
    throw new Error("Year group/graduation already exists");
  }
  const yearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth?._id,
  });
  const admin = Admin.findById(req.userAuth?._id);
  admin.YearGroups.push(YearGroup._id);
  admin.save();
  res.status(201).send({
    status: "Success",
    message: "Year group created successfully",
    data: {
      yearGroup,
    },
  });
});

/**
 *@description Fetch year groups controller
 *@Route GET /api/v1/year-groups
 *@access Private
 */
export const getYearGroupsCtrl = asyncHandler(async (req, res) => {
  const yearGroups = await YearGroup.find();
  res.status(200).send({
    status: "Success",
    message: "Year groups fetched successfully",
    data: {
      yearGroups,
    },
  });
});

/**
 *@description Fetch year group controller
 *@Route GET /api/v1/year-groups/:id
 *@access Private
 */
export const getYearGroupCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const yearGroup = await YearGroup.findById(id);
  res.status(200).send({
    status: "Success",
    message: "Year group fetched successfully",
    data: {
      yearGroup,
    },
  });
});

/**
 *@description Update year group controller
 *@Route PUT /api/v1/year-groups/:id
 *@access Private
 */
export const updateYearGroupCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, academicYear } = req.body;
  const yearGroupFound = await YearGroup.findById(id);
  if (!yearGroupFound) {
    throw new Error("Year group doesn't exists");
  }
  const yearGroup = await YearGroup.findByIdAndUpdate(
    id,
    {
      name,
      academicYear,
      createdBy: req.userAuth?._id,
    },
    {
      new: true,
    }
  );
  res.status(200).send({
    status: "Success",
    message: "Year group updated successfully",
    data: {
      yearGroup,
    },
  });
});

/**
 *@description Delete year group controller
 *@Route DELETE /api/v1/year-groups/:id
 *@access Private
 */
export const deleteYearGroupCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const yearGroup = await YearGroup.findByIdAndDelete(id, { new: true });
  res.status(200).send({
    status: "Success",
    message: "Year group deleted successfully",
    data: {
      yearGroup,
    },
  });
});
