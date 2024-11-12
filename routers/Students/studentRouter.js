import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import isAdmin from "../../middlewares/isAdmin.js";
import {
  adminRegisterStudentCtrl,
  // adminUpdateStudentProfileCtrl,
  // getStudentCtrl,
  // getStudentProfileCtrl,
  // getStudentsCtrl,
  // loginStudentCtrl,
  // updateStudentProfileCtrl,
} from "../../controllers/Students/studentCtrl.js";

const studentRoutes = express.Router();

studentRoutes.post("/admin/register", isLogin, isAdmin, adminRegisterStudentCtrl);
// studentRoutes.post("/login", loginStudentCtrl);
// studentRoutes.get("/admin", getStudentsCtrl);
// studentRoutes.get("/admin/:StudentID", getStudentCtrl);
// studentRoutes.get("/profile", getStudentProfileCtrl);
// studentRoutes.put("/update/:StudentID", updateStudentProfileCtrl);
// studentRoutes.put("/admin/update/:StudentID", adminUpdateStudentProfileCtrl);

export default studentRoutes;
