import express from "express";
import isStudentLogin from "../../middlewares/isStudentLogIn.js";
import isStudent from "../../middlewares/isStudent.js";
import {
  adminTogglePublishExamResultsCtrl,
  checkExamResultsCtrl,
  getExamResultsCtrl,
} from "../../controllers/Academics/examResultsCtrl.js";
import isLogin from "../../middlewares/isLogin.js";
import isAdmin from "../../middlewares/isAdmin.js";

const examResultsRoutes = express.Router();
examResultsRoutes.get("/", isStudentLogin, isStudent, getExamResultsCtrl);
examResultsRoutes.get(
  "/:examResultID/checking",
  isStudentLogin,
  isStudent,
  checkExamResultsCtrl
);
examResultsRoutes.put(
  "/:examResultID/admin-publish",
  isLogin,
  isAdmin,
  adminTogglePublishExamResultsCtrl
);
export default examResultsRoutes;
