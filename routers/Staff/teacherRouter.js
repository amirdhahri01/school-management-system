import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import isAdmin from "../../middlewares/isAdmin.js";
import {
  adminRegisterTeacherCtrl,
  adminUpdateTeacherProfileCtrl,
  getTeacherCtrl,
  getTeacherProfileCtrl,
  getTeachersCtrl,
  loginTeacherCtrl,
  updateTeacherProfileCtrl,
} from "../../controllers/Staff/teacherCtrl.js";
import isTeacherLogin from "../../middlewares/isTeacherLogIn.js";
import isTeacher from "../../middlewares/isTeacher.js";

const teacherRoutes = express.Router();

teacherRoutes.post(
  "/admin/register",
  isLogin,
  isAdmin,
  adminRegisterTeacherCtrl
);
teacherRoutes.post("/login", loginTeacherCtrl);
teacherRoutes.get("/admin", isLogin, isAdmin, getTeachersCtrl);
teacherRoutes.get("/admin/:teacherID", isLogin, isAdmin, getTeacherCtrl);
teacherRoutes.get("/profile", isTeacherLogin, isTeacher, getTeacherProfileCtrl);
teacherRoutes.put(
  "/update/:teacherID",
  isTeacherLogin,
  isTeacher,
  updateTeacherProfileCtrl
);
teacherRoutes.put(
  "/admin/update/:teacherID",
  isLogin,
  isAdmin,
  adminUpdateTeacherProfileCtrl
);

export default teacherRoutes;
