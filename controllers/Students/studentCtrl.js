import asyncHandler from "express-async-handler";
import Teacher from "../../models/Staff/Teacher.js";
import { hashPassword, isPasswordMatch } from "../../utils/helpers.js";
import generateToken from "../../utils/generateToken.js";
import Student from "../../models/Staff/Student.js";
import Exam from "../../models/Academic/Exam.js";
import ExamResult from "../../models/Academic/ExamResults.js";

/**
 *@description Admin register student controller
 *@Route POST /api/v1/students/admin/register
 *@access Private - Admin Only
 */
export const adminRegisterStudentCtrl = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const studentFound = await Student.findOne({ email });
  if (studentFound) {
    throw new Error("Student already exists");
  }
  const hasedPassword = await hashPassword(password);
  const student = await Student.create({
    name,
    email,
    password: hasedPassword,
  });
  res.status(201).json({
    status: "Success",
    message: "Student registered successfully",
    data: {
      student,
    },
  });
});

/**
 *@description Login student
 *@Route POST /api/v1/students/login
 *@access Public
 */
export const loginStudentCtrl = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const studentFound = await Student.findOne({ email });
  if (!studentFound) {
    throw new Error("Student not found");
  }
  const isMatched = await isPasswordMatch(password, studentFound.password);
  if (!isMatched) {
    throw new Error("Invalid login credentials");
  }
  const token = generateToken(studentFound._id);
  res.status(200).json({
    status: "Success",
    message: "Student logged in successfully",
    data: {
      token,
    },
  });
});

/**
 *@description Get students
 *@Route GET /api/v1/students/admin
 *@access Private - Admin Only
 */
export const getStudentsCtrl = asyncHandler(async (req, res) => {
  const students = await Student.find();
  res.status(200).json({
    status: "Success",
    message: "Students fetched sucessfully",
    data: {
      students,
    },
  });
});

/**
 *@description Get student
 *@Route GET /api/v1/students/admin/:studentID
 *@access Private - Admin Only
 */
export const getStudentCtrl = asyncHandler(async (req, res) => {
  const { studentID } = req.params;
  const student = await Student.findById(studentID);
  res.status(200).json({
    status: "Success",
    message: "Student fetched sucessfully",
    data: {
      student,
    },
  });
});

/**
 *@description Get student profile
 *@Route GET /api/v1/students/profile
 *@access Private - Student Only
 */
export const getStudentProfileCtrl = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.userAuth?._id)
    .select("-password -createdAt -updatedAt")
    .populate("examResults");
  if (!student) {
    throw new Error("Student doesn't exists");
  }
  const studentProfile = {
    name: student.name,
    email: student.email,
    currentClassLevel: student.currentClassLevel,
    program: student.program,
    dateAdmitted: student.dateAdmitted,
    isSuspended: student.isSuspended,
    isWithdrawn: student.isWithdrawn,
    studentID: student.studentId,
    prefectName: student.prefectName,
  };
  const examResults = student.examResults;
  const currentExamResult = examResults[examResults.length - 1];
  const isPublished = currentExamResult?.isPublished;
  res.status(200).json({
    status: "Success",
    message: "Student profile fetched sucessfully",
    data: {
      studentProfile,
      currentExamResult: isPublished ? currentExamResult : [],
    },
  });
});

/**
 *@description Student update profile controller
 *@Route PUT /api/v1/students/update
 *@access Private - Student Only
 */
export const updateStudentProfileCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const studentFound = await Student.findOne(email);
  if (!studentFound) {
    throw new Error("This email is taken/exists");
  }
  const hashedPassword = "";
  if (password) {
    hashedPassword = await hashPassword(password);
  }
  const student = await Student.findByIdAndUpdate(
    req.userAuth._id,
    { email, password: hashedPassword },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: "Success",
    message: "Student profile updated successfully",
    data: {
      student,
    },
  });
});

/**
 *@description Admin update student profile controller
 *@Route PUT /api/v1/students/admin/update/:studentID
 *@access Private - Admin Only
 */
export const adminUpdateStudentProfileCtrl = asyncHandler(async (req, res) => {
  const { classLevels, academicYear, program, name, email, prefectName } =
    req.body;
  const { studentID } = req.params;
  const studentFound = Student.findById(studentID);
  if (!studentFound) {
    throw new Error("Student not found");
  }
  const student = Student.findByIdAndUpdate(
    studentID,
    {
      $set: { academicYear, program, name, email, prefectName },
      $addToSet: { classLevels },
    },
    { new: true }
  );
  res.status(200).json({
    status: "Success",
    message: "Student profile updated successfully",
    data: {
      student,
    },
  });
});

/**
 *@description Student taking exams controller
 *@Route POST /api/v1/students/exams/:examID/write
 *@access Private - Student Only
 */

export const studentWriteExamCtrl = asyncHandler(async (req, res) => {
  const studentFound = await Student.findById(req.userAuth?._id);
  if (!studentFound) {
    throw new Error("Student not found");
  }
  const { examID } = req.params;
  const examFound = await Exam.findById(examID)
    .populate("questions")
    .populate("academicTerm");
  if (!examFound) {
    throw new Error("Exam not found");
  }
  const questions = examFound.questions;
  const studentAnswers = req.body.answers;
  if (studentAnswers.length !== questions.length) {
    throw new Error("You have not answered all the questions");
  }
  const examResultFound = await ExamResult.findOne({
    student: studentFound?._id,
  });

  if (examResultFound) {
    throw new Error("You have already witten this exam");
  }
  if (studentFound.isSuspended || studentFound.isWithdrawn) {
    throw new Error("You are suspended/withdrawn, you can't this exam");
  }
  //Build the report object
  let correctAnswers = 0;
  let wrongAnswers = 0;
  let totalQuestions = questions.length;
  let score = 0;
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    if (question.correctAnswer === studentAnswers[i]) {
      correctAnswers++;
      score++;
      question.isCorrect = true;
    } else {
      wrongAnswers++;
    }
  }
  let grade = (correctAnswers / totalQuestions) * 100;
  let answeredQuestions = questions.map((question) => {
    return {
      question: question.question,
      correctAnswer: question.correctAnswer,
      isCorrect: question.isCorrect,
    };
  });
  let status = "";
  if (grade >= 50) {
    status = "Passed";
  } else {
    status = "Failed";
  }
  let remarks = "";
  if (grade >= 80) {
    remarks = "Excellent";
  } else if (grade >= 70) {
    remarks = "Very Good";
  } else if (grade >= 60) {
    remarks = "Good";
  } else if (grade >= 50) {
    remarks = "Fair";
  } else {
    remarks = "Poor";
  }
  const examResult = await ExamResult.create({
    studentID: studentFound?.studentId,
    exam: examFound?._id,
    grade,
    score,
    status,
    remarks,
    classLevels: examFound?.classLevel,
    academicTerm: examFound?.academicTerm,
    academicYear: examFound?.academicYear,
    answeredQuestions: answeredQuestions,
  });
  studentFound.examResults.push(examResult?._id);
  await studentFound.save();
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Passed" &&
    studentFound.currentClassLevel === "Level 100"
  ) {
    studentFound.classLevels.push("Level 200");
    studentFound.currentClassLevel = "Level 200";
    await studentFound.save();
  }
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Passed" &&
    studentFound.currentClassLevel === "Level 200"
  ) {
    studentFound.classLevels.push("Level 300");
    studentFound.currentClassLevel = "Level 300";
    await studentFound.save();
  }
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Passed" &&
    studentFound.currentClassLevel === "Level 300"
  ) {
    studentFound.classLevels.push("Level 400");
    studentFound.currentClassLevel = "Level 400";
    await studentFound.save();
  }
  if (
    examFound.academicTerm.name === "3rd term" &&
    status === "Passed" &&
    studentFound.currentClassLevel === "Level 400"
  ) {
    studentFound.isGraduated = true;
    studentFound.yearGraduated = new Date.now();
    await studentFound.save();
  }
  res.status(200).json({
    status: "Success",
    message: "Student write exam successfully",
    data: {
      status,
      correctAnswers,
      wrongAnswers,
      score,
      grade,
      answeredQuestions,
      remarks,
    },
  });
});
