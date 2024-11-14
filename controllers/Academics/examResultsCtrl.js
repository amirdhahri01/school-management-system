import asyncHandler from "express-async-handler";
import ExamResult from "../../models/Academic/ExamResults.js";

/**
 *@description Exam results checking controller
 *@Route GET /api/v1/exam-results/:examID/checking
 *@access Private - Student Only
 */
export const checkExamResultsCtrl = asyncHandler(async (req, res) => {});

/**
 *@description Get exam results checking controller
 *@Route GET /api/v1/exam-results
 *@access Private - Student Only
 */
export const getExamResultsCtrl = asyncHandler(async (req, res) => {
  const examResults = await ExamResult.find();
  res.json({
    status: "Success",
    message: "Exam results fetchead successfully",
    data: {
      examResults,
    },
  });
});
