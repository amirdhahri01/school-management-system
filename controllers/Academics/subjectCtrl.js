import asyncHandler from "express-async-handler";
import Subject from "../../models/Academic/Subject.js";
import Program from "../../models/Academic/Program.js";

/**
 *@description Create subject controller
 *@Route POST /api/v1/subjects/:programID
 *@access Private
 */
export const createSubjectCtrl = asyncHandler(async (req, res) => {
  const programFound = await Program.findById(req.params.programID);
  if (!programFound) {
    throw new Error("Program doesn't exists");
  }
  const { name, description, academicTerm } = req.body;
  const subjectFound = await Subject.findOne({ name });
  if (subjectFound) {
    throw new Error("Subject already exists");
  }
  const subject = await Subject.create({
    name,
    description,
    academicTerm,
    createdBy: req.userAuth?._id,
  });
  programFound.subjects.push(subject._id);
  programFound.save();
  res.status(201).send({
    status: "Success",
    message: "Subject created successfully",
    data: {
      subject,
    },
  });
});

/**
 *@description Fetch subjects controller
 *@Route GET /api/v1/subjects
 *@access Private
 */
export const getSubjectsCtrl = asyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  res.status(200).send({
    status: "Success",
    message: "Subjects fetched successfully",
    data: {
      subjects,
    },
  });
});

/**
 *@description Fetch subject controller
 *@Route GET /api/v1/subjects/:id
 *@access Private
 */
export const getSubjectCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findById(id);
  res.status(200).send({
    status: "Success",
    message: "Subject fetched successfully",
    data: {
      subject,
    },
  });
});

/**
 *@description Update subject controller
 *@Route PUT /api/v1/subjects/:id
 *@access Private
 */
export const updateSubjectCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, academicTerm } = req.body;
  const subjectFound = await Subject.findById(id);
  if (!subjectFound) {
    throw new Error("Subject doesn't exists");
  }
  const subject = await Subject.findByIdAndUpdate(
    id,
    {
      name,
      description,
      academicTerm,
      createdBy: req.userAuth?._id,
    },
    {
      new: true,
    }
  );
  res.status(200).send({
    status: "Success",
    message: "Subject updated successfully",
    data: {
      subject,
    },
  });
});

/**
 *@description Delete subject controller
 *@Route DELETE /api/v1/subjects/:id
 *@access Private
 */
export const deleteSubjectCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const subject = await Subject.findByIdAndDelete(id, { new: true });
  res.status(200).send({
    status: "Success",
    message: "Subject deleted successfully",
    data: {
      subject,
    },
  });
});
