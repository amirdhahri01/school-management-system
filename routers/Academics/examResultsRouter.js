import express from "express";
import isStudentLogin from "../../middlewares/isStudentLogIn.js";
import isStudent from "../../middlewares/isStudent.js";
import {
  checkExamResultsCtrl,
  getExamResultsCtrl,
} from "../../controllers/Academics/examResultsCtrl.js";

const examResultsRoutes = express.Router();
examResultsRoutes.route("/").get(isStudentLogin, isStudent, getExamResultsCtrl);
examResultsRoutes
  .route("/:examID/checking")
  .get(isStudentLogin, isStudent, checkExamResultsCtrl);

export default examResultsRoutes;
