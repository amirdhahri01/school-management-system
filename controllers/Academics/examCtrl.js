import asyncHandler from "express-async-handler";
import Teacher from "../../models/Staff/Teacher.js";
import Exam from "../../models/Academic/Exam.js";

/**
 *@description Create exam controller
 *@Route POST /api/v1/exams
 *@access Private teachers only
 */
export const createExamCtrl = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    academicYear,
    classLevel,
  } = req.body;
  const teacherFound = await Teacher.findById(req.userAuth?._id);
  if (!teacherFound) {
    throw new Error("Teacher not found");
  }
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    throw new Error("Exam already exists");
  }
  const exam = new Exam({
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    academicYear,
    classLevel,
    createdBy: req.userAuth?._id,
  });
  teacherFound.examsCreated.push(exam?._id);
  await exam.save();
  await teacherFound.save();
  res.status(201).send({
    status: "Success",
    message: "Exam created successfully",
    data: {
      exam,
    },
  });
});

/**
 *@description Fetch exams controller
 *@Route GET /api/v1/exams
 *@access Private
 */
export const getExamsCtrl = asyncHandler(async (req, res) => {
  const exams = await Exam.find();
  res.status(200).send({
    status: "Success",
    message: "Exams fetched successfully",
    data: {
      exams,
    },
  });
});

/**
 *@description Fetch exam controller
 *@Route GET /api/v1/exams/:examID
 *@access Private
 */
export const getExamCtrl = asyncHandler(async (req, res) => {
  const { examID } = req.params;
  const exam = await Exam.findById(examID);
  res.status(200).send({
    status: "Success",
    message: "Exam fetched successfully",
    data: {
      exam,
    },
  });
});

/**
 *@description Update exam controller
 *@Route PUT /api/v1/exams/:examID
 *@access Private - Teacher Only
 */
export const updateExamCtrl = asyncHandler(async (req, res) => {
  const { examID } = req.params;
  const {
    name,
    description,
    subject,
    program,
    academicTerm,
    duration,
    examDate,
    examTime,
    examType,
    academicYear,
    classLevel,
  } = req.body;
  const examFound = await Exam.findById(examID);
  if (!examFound) {
    throw new Error("Exam doesn't exists");
  }
  const examExists = await Exam.findOne({ name });
  if (examExists) {
    throw new Error("Exam already exists");
  }
  const exam = await Exam.findByIdAndUpdate(
    examID,
    {
      name,
      description,
      subject,
      program,
      academicTerm,
      duration,
      examDate,
      examTime,
      examType,
      academicYear,
      classLevel,
      createdBy: req.userAuth?._id,
    },
    { new: true }
  );
  res.status(200).send({
    status: "Success",
    message: "Exam updated successfully",
    data: {
      exam,
    },
  });
});
