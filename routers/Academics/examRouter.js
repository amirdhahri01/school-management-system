import express from "express";
import {
  createExamCtrl,
  getExamCtrl,
  getExamsCtrl,
  updateExamCtrl,
} from "../../controllers/Academics/examCtrl.js";
import isTeacherLogin from "../../middlewares/isTeacherLogIn.js";
import isTeacher from "../../middlewares/isTeacher.js";

const examRoutes = express.Router();
examRoutes
  .route("/")
  .get(isTeacherLogin, isTeacher, getExamsCtrl)
  .post(isTeacherLogin, isTeacher, createExamCtrl);

examRoutes
  .route("/:examID")
  .get(isTeacherLogin, isTeacher, getExamCtrl)
  .put(isTeacherLogin, isTeacher, updateExamCtrl);
//   .delete(isLogin, deleteClassLevelCtrl);

export default examRoutes;
