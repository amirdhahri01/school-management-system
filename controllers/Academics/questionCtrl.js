import asyncHandler from "express-async-handler";
import Exam from "../../models/Academic/Exam.js";
import Question from "../../models/Academic/Questions.js";

/**
 *@description Create question controller
 *@Route POST /api/v1/questions/:examID
 *@access Private - Teachers Only
 */
export const createQuestionCtrl = asyncHandler(async (req, res) => {
  const { question, opationA, opationB, opationC, opationD, correctAnswer } =
    req.body;
  const { examID } = req.params;
  const examFound = await Exam.findById(examID);
  if (!examFound) {
    throw new Error("Exam doesn't exists");
  }
  const questionFound = await Question.findOne({ question });
  if (questionFound) {
    throw new Error("Question already exists");
  }
  const questionCreated = new Question({
    opationA,
    opationB,
    opationC,
    opationD,
    correctAnswer,
    createdBy: req.userAuth?._id,
  });
  examFound.questions.push(questionCreated?._id);
  await examFound.save();
  await questionCreated.save();
  res.status(201).send({
    status: "Success",
    message: "Question created successfully",
    data: {
      question: questionCreated,
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
