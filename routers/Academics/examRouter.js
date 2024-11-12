import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import { createExamCtrl } from "../../controllers/Academics/examCtrl.js";
import isTeacherLogin from "../../middlewares/isTeacherLogIn.js";
import isTeacher from "../../middlewares/isTeacher.js";

const examRoutes = express.Router();
examRoutes
  .route("/")
  //   .get(isLogin, getClassLevelsCtrl)
  .post(isTeacherLogin, isTeacher, createExamCtrl);

// ClassLevelRoutes.route("/:id")
//   .get(isLogin, getClassLevelCtrl)
//   .put(isLogin, updateClassLevelCtrl)
//   .delete(isLogin, deleteClassLevelCtrl);

export default examRoutes;
