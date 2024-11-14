import asyncHandler from "express-async-handler";
import ExamResult from "../../models/Academic/ExamResults.js";
import Student from "../../models/Staff/Student.js";

/**
 *@description Exam results checking controller
 *@Route GET /api/v1/exam-results/:examResultID/checking
 *@access Private - Student Only
 */
export const checkExamResultsCtrl = asyncHandler(async (req, res) => {
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    throw new Error("No student found");
  }
  const { examResultID } = req.params;
  const examResults = await ExamResult.findOne({
    studentID: studentFound.studentId,
    _id: examResultID,
  });
  if (!examResults?.isPublished) {
    throw new Error("Exam result is not available, check out later");
  }
  res.json({
    status: "Success",
    message: "Exam results fetchead successfully",
    data: {
      examResults,
    },
  });
});

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
