import asyncHandler from "express-async-handler";
import Exam from "../../models/Academic/Exam.js";
import Question from "../../models/Academic/Questions.js";

/**
 *@description Create question controller
 *@Route POST /api/v1/questions/:examID
 *@access Private - Teachers Only
 */
export const createQuestionCtrl = asyncHandler(async (req, res) => {
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
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
    question,
    optionA,
    optionB,
    optionC,
    optionD,
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
 *@description Fetch questions controller
 *@Route GET /api/v1/questions
 *@access Private - Teachers Only
 */
export const getQuestionsCtrl = asyncHandler(async (req, res) => {
  const questions = await Question.find();
  res.status(200).send({
    status: "Success",
    message: "Questions fetched successfully",
    data: {
      questions,
    },
  });
});

/**
 *@description Fetch question controller
 *@Route GET /api/v1/questions/:questionID
 *@access Private - Teachers Only
 */
export const getQuestionCtrl = asyncHandler(async (req, res) => {
  const { questionID } = req.params;
  const question = await Question.findById(questionID);
  res.status(200).send({
    status: "Success",
    message: "Question fetched successfully",
    data: {
      question,
    },
  });
});

/**
 *@description Update question controller
 *@Route PUT /api/v1/questions/:questionID
 *@access Private - Teacher Only
 */
export const updateQuestionCtrl = asyncHandler(async (req, res) => {
  const { questionID } = req.params;
  const { question, optionA, optionB, optionC, optionD, correctAnswer } =
    req.body;
  const questionFound = await Question.findById(questionID);
  if (!questionFound) {
    throw new Error("Question doesn't exists");
  }
  const questionExists = await Question.findOne({ question });
  if (questionExists) {
    throw new Error("Question already exists");
  }
  const questionUpdated = await Question.findByIdAndUpdate(
    questionID,
    {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
      createdBy: req.userAuth?._id,
    },
    { new: true }
  );
  res.status(200).send({
    status: "Success",
    message: "Question updated successfully",
    data: {
      question: questionUpdated,
    },
  });
});

/**
 *@description Delete question controller
 *@Route Delete /api/v1/questions/:questionID
 *@access Private - Teachers Only
 */
export const deleteQuestionCtrl = asyncHandler(async (req, res) => {
  const { questionID } = req.params;
  const question = await Question.findByIdAndDelete(questionID);
  res.status(200).send({
    status: "Success",
    message: "Question Deleted successfully",
    data: {
      question,
    },
  });
});
