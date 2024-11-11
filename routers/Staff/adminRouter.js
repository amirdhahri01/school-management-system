import express from "express";
import {
  adminPublishExamCtrl,
  adminSuspendTeacherCtrl,
  adminUnpublishExamCtrl,
  adminUnsuspendTeacherCtrl,
  adminUnwithdrawTeacherCtrl,
  adminWithdrawTeacherCtrl,
  deleteAdminCtrl,
  getAdminProfileCtrl,
  getAdminsCtrl,
  loginAdminCtrl,
  registerAdminCtrl,
  updateAdminCtrl,
} from "../../controllers/Staff/adminCtrl.js";
import isLogin from "../../middlewares/isLogIn.js";
import isAdmin from "../../middlewares/isAdmin.js";

const adminRoutes = express.Router();

adminRoutes.get("/", isLogin, getAdminsCtrl);
adminRoutes.get("/profile", isLogin, isAdmin, getAdminProfileCtrl);
adminRoutes.post("/register", registerAdminCtrl);
adminRoutes.post("/login", loginAdminCtrl);
adminRoutes.put("/update", isLogin, isAdmin, updateAdminCtrl);
adminRoutes.put("/suspend/teacher/:id", isLogin, adminSuspendTeacherCtrl);
adminRoutes.put("/unsuspend/teacher/:id", isLogin, adminUnsuspendTeacherCtrl);
adminRoutes.put("/withdraw/teacher/:id", isLogin, adminWithdrawTeacherCtrl);
adminRoutes.put("/unwithdraw/teacher/:id", isLogin, adminUnwithdrawTeacherCtrl);
adminRoutes.put("/publish/exam/:id", isLogin, adminPublishExamCtrl);
adminRoutes.put("/unpublish/exam/:id", isLogin, adminUnpublishExamCtrl);
adminRoutes.delete("/delete/:id", isLogin, deleteAdminCtrl);

export default adminRoutes;
