import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import isAdmin from "../../middlewares/isAdmin.js";
import {
  adminRegisterTeacher,
  getTeacherCtrl,
  getTeacherProfileCtrl,
  getTeachersCtrl,
  loginTeacherCtrl,
  updateTeacherProfile,
} from "../../controllers/Staff/teacherCtrl.js";

const teacherRoutes = express.Router();

teacherRoutes.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teacherRoutes.post("/login", loginTeacherCtrl);
teacherRoutes.get("/admin", getTeachersCtrl);
teacherRoutes.get("/admin/:teacherID", getTeacherCtrl);
teacherRoutes.get("/profile", getTeacherProfileCtrl);
teacherRoutes.get("/update/:teacherID", updateTeacherProfile);

export default teacherRoutes;
