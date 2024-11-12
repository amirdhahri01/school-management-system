import asyncHandler from "express-async-handler";
import Admin from "../../models/Staff/Admin.js";
import Program from "../../models/Academic/Program.js";

/**
 *@description Create program controller
 *@Route POST /api/v1/programs
 *@access Private
 */
export const createProgramCtrl = asyncHandler(async (req, res) => {
  const { name, description , duration} = req.body;
  const programFound = await Program.findOne({ name });
  if (programFound) {
    throw new Error("Program already exists");
  }
  const program = await Program.create({
    name,
    description,
    createdBy: req.userAuth?._id,
  });
  const admin = await Admin.findById(req.userAuth?._id);
  admin.programs.push(program._id);
  admin.save();
  res.status(201).send({
    status: "Success",
    message: "Program created successfully",
    data: {
      program,
    },
  });
});

/**
 *@description Fetch programs controller
 *@Route GET /api/v1/programs
 *@access Private
 */
export const getProgramsCtrl = asyncHandler(async (req, res) => {
  const programs = await Program.find();
  res.status(200).send({
    status: "Success",
    message: "Programs fetched successfully",
    data: {
      programs,
    },
  });
});

/**
 *@description Fetch program controller
 *@Route GET /api/v1/programs/:id
 *@access Private
 */
export const getProgramCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const program = await Program.findById(id);
  res.status(200).send({
    status: "Success",
    message: "Program fetched successfully",
    data: {
      program,
    },
  });
});

/**
 *@description Update program controller
 *@Route PUT /api/v1/programs/:id
 *@access Private
 */
export const updateProgramCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const programFound = await Program.findById(id);
  if (!programFound) {
    throw new Error("Class level doesn't exists");
  }
  const program = await Program.findByIdAndUpdate(
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
    message: "Program updated successfully",
    data: {
      program,
    },
  });
});

/**
 *@description Delete program controller
 *@Route DELETE /api/v1/programs/:id
 *@access Private
 */
export const deleteProgramCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const program = await Program.findByIdAndDelete(id, { new: true });
  res.status(200).send({
    status: "Success",
    message: "Program deleted successfully",
    data: {
      program,
    },
  });
});
