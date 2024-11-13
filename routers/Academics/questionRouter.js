import express from "express";
import {
  createQuestionCtrl,
  // getExamCtrl,
  // getExamsCtrl,
  // updateExamCtrl,
} from "../../controllers/Academics/questionCtrl.js";
import isTeacherLogin from "../../middlewares/isTeacherLogIn.js";
import isTeacher from "../../middlewares/isTeacher.js";

const questionRoutes = express.Router();
// examRoutes
//   .route("/")
//   .get(isTeacherLogin, isTeacher, getExamsCtrl)
//   .post(isTeacherLogin, isTeacher, createExamCtrl);

questionRoutes
  .route("/:examID")
  .get(isTeacherLogin, isTeacher, createQuestionCtrl)
//   .put(isTeacherLogin, isTeacher, updateExamCtrl);
// //   .delete(isLogin, deleteClassLevelCtrl);

export default questionRoutes;
