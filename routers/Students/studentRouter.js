import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import isAdmin from "../../middlewares/isAdmin.js";
import {
  adminRegisterStudentCtrl,
  adminUpdateStudentProfileCtrl,
  getStudentCtrl,
  getStudentProfileCtrl,
  getStudentsCtrl,
  loginStudentCtrl,
  studentWriteExamCtrl,
  updateStudentProfileCtrl,
} from "../../controllers/Students/studentCtrl.js";
import isStudentLogin from "../../middlewares/isStudentLogIn.js";
import isStudent from "../../middlewares/isStudent.js";

const studentRoutes = express.Router();

studentRoutes.post(
  "/admin/register",
  isLogin,
  isAdmin,
  adminRegisterStudentCtrl
);
studentRoutes.post("/login", loginStudentCtrl);
studentRoutes.post(
  "/exams/:examID/write",
  isStudentLogin,
  isStudent,
  studentWriteExamCtrl
);
studentRoutes.get("/admin", isLogin, isAdmin, getStudentsCtrl);
studentRoutes.get("/admin/:studentID", isLogin, isAdmin, getStudentCtrl);
studentRoutes.get("/profile", isStudentLogin, isStudent, getStudentProfileCtrl);
studentRoutes.put(
  "/update/:studentID",
  isStudentLogin,
  isStudent,
  updateStudentProfileCtrl
);
studentRoutes.put(
  "/admin/update/:studentID",
  isLogin,
  isAdmin,
  adminUpdateStudentProfileCtrl
);
export default studentRoutes;
