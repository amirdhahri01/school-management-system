import express from "express";
import {
  createQuestionCtrl,
  getQuestionCtrl,
  getQuestionsCtrl,
  updateQuestionCtrl,
  deleteQuestionCtrl
} from "../../controllers/Academics/questionCtrl.js";
import isTeacherLogin from "../../middlewares/isTeacherLogIn.js";
import isTeacher from "../../middlewares/isTeacher.js";

const questionRoutes = express.Router();
questionRoutes.route("/").get(isTeacherLogin, isTeacher, getQuestionsCtrl);

questionRoutes
  .route("/:questionID")
  .get(isTeacherLogin, isTeacher, getQuestionCtrl)
  .put(isTeacherLogin, isTeacher, updateQuestionCtrl)
  .delete(isTeacherLogin, isTeacher, deleteQuestionCtrl);
questionRoutes
  .route("/:examID")
  .post(isTeacherLogin, isTeacher, createQuestionCtrl);

export default questionRoutes;
