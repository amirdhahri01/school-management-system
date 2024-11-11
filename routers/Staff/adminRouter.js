import express from "express";
import {
  adminPublishExamCtrl,
  adminSuspendTeacherCtrl,
  adminUnpublishExamCtrl,
  adminUnsuspendTeacherCtrl,
  adminUnwithdrawTeacherCtrl,
  adminWithdrawTeacherCtrl,
  deleteAdminCtrl,
  getAdminCtrl,
  getAdminsCtrl,
  loginAdminCtrl,
  registerAdminCtrl,
} from "../../controllers/Staff/adminCtrl.js";
import isLogin from "../../middlewares/isLogIn.js";

const adminRoutes = express.Router();

adminRoutes.get("/", isLogin, getAdminsCtrl);
adminRoutes.get("/single/:id", isLogin, getAdminCtrl);
adminRoutes.post("/register", registerAdminCtrl);
adminRoutes.post("/login", loginAdminCtrl);
adminRoutes.put("/suspend/teacher/:id", isLogin, adminSuspendTeacherCtrl);
adminRoutes.put("/unsuspend/teacher/:id", isLogin, adminUnsuspendTeacherCtrl);
adminRoutes.put("/withdraw/teacher/:id", isLogin, adminWithdrawTeacherCtrl);
adminRoutes.put("/unwithdraw/teacher/:id", isLogin, adminUnwithdrawTeacherCtrl);
adminRoutes.put("/publish/exam/:id", isLogin, adminPublishExamCtrl);
adminRoutes.put("/unpublish/exam/:id", isLogin, adminUnpublishExamCtrl);
adminRoutes.delete("/:id", isLogin, deleteAdminCtrl);

export default adminRoutes;
