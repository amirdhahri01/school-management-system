import asyncHandler from "express-async-handler";
import Admin from "../../models/Staff/Admin.js";
import ClassLevel from "../../models/Academic/ClassLevel.js";

/**
 *@description Create class level controller
 *@Route POST /api/v1/class-levels
 *@access Private
 */
export const createClassLevelCtrl = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const classLevelFound = await ClassLevel.findOne({ name });
  if (classLevelFound) {
    throw new Error("Class level already exists");
  }
  const classLevel = await ClassLevel.create({
    name,
    description,
    createdBy: req.userAuth?._id,
  });
  const admin = await Admin.findById(req.userAuth?._id);
  admin.classLevels.push(classLevel._id);
  admin.save();
  res.status(201).send({
    status: "Success",
    messagge: "Class level created successfully",
    data: {
      classLevel,
    },
  });
});

/**
 *@description Fetch class levels controller
 *@Route GET /api/v1/class-levels
 *@access Private
 */
export const getClassLevelsCtrl = asyncHandler(async (req, res) => {
  const classLevels = await ClassLevel.find();
  res.status(200).send({
    status: "Success",
    messagge: "Class levels fetched successfully",
    data: {
      classLevels,
    },
  });
});

/**
 *@description Fetch class level controller
 *@Route GET /api/v1/class-levels/:id
 *@access Private
 */
export const getClassLevelCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classLevel = await classLevel.findById(id);
  res.status(200).send({
    status: "Success",
    messagge: "Class level fetched successfully",
    data: {
      classLevel,
    },
  });
});

/**
 *@description Update class level controller
 *@Route PUT /api/v1/class-levels/:id
 *@access Private
 */
export const updateClassLevelCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const classLevelFound = await ClassLevel.findById(id);
  if (!classLevelFound) {
    throw new Error("Class level doesn't exists");
  }
  const classLevel = await ClassLevel.findByIdAndUpdate(
    id,
    {
      name,
      description,
      createdBy: req.userAuth?._id,
    },
    {
      new: true,
    }
  );
  res.status(200).send({
    status: "Success",
    messagge: "Class level updated successfully",
    data: {
      classLevel,
    },
  });
});

/**
 *@description Delete class level controller
 *@Route DELETE /api/v1/class-levels/:id
 *@access Private
 */
export const deleteClassLevelCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classLevel = await ClassLevel.findByIdAndDelete(id, { new: true });
  res.status(200).send({
    status: "Success",
    messagge: "Class level deleted successfully",
    data: {
      classLevel,
    },
  });
});
