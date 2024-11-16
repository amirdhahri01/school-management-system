import express from "express";
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
import advancedResults from "../../middlewares/advancedResults.js";
import Teacher from "../../models/Staff/Teacher.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import Admin from "../../models/Staff/Admin.js";
import roleRestriction from "../../middlewares/roleRestriction.js";

const teacherRoutes = express.Router();

teacherRoutes.post(
  "/admin/register",
  isAuthenticated(Admin),
  isAdmin,
  adminRegisterTeacherCtrl
);
teacherRoutes.post("/login", loginTeacherCtrl);
teacherRoutes.get("/admin", isAuthenticated(Admin), roleRestriction("admin"), advancedResults(Teacher, { path: "examsCreated", populate: { path: "questions" } }), getTeachersCtrl);
teacherRoutes.get("/admin/:teacherID", isAuthenticated(Admin), isAdmin, getTeacherCtrl);
teacherRoutes.get("/profile", isTeacherLogin, isTeacher, getTeacherProfileCtrl);
teacherRoutes.put(
  "/update/:teacherID",
  isTeacherLogin,
  isTeacher,
  updateTeacherProfileCtrl
);
teacherRoutes.put(
  "/admin/update/:teacherID",
  isAuthenticated(Admin),
  isAdmin,
  adminUpdateTeacherProfileCtrl
);

export default teacherRoutes;
