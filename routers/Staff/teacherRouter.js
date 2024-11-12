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

const teacherRoutes = express.Router();

teacherRoutes.post("/admin/register", isLogin, isAdmin, adminRegisterTeacherCtrl);
teacherRoutes.post("/login", loginTeacherCtrl);
teacherRoutes.get("/admin", getTeachersCtrl);
teacherRoutes.get("/admin/:teacherID", getTeacherCtrl);
teacherRoutes.get("/profile", getTeacherProfileCtrl);
teacherRoutes.put("/update/:teacherID", updateTeacherProfileCtrl);
teacherRoutes.put("/admin/update/:teacherID", adminUpdateTeacherProfileCtrl);

export default teacherRoutes;
