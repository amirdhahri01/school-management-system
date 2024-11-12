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
