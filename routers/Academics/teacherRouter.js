import express from "express";
import isLogin from "../../middlewares/isLogIn.js";
import isAdmin from "../../middlewares/isAdmin.js";
import { adminRegisterTeacher, loginTeacherCtrl } from "../../controllers/Staff/teacherCtrl.js";

const teacherRoutes = express.Router();


teacherRoutes.post("/admin/register" , isLogin ,isAdmin , adminRegisterTeacher);
teacherRoutes.post("/login" ,  loginTeacherCtrl);

export default teacherRoutes