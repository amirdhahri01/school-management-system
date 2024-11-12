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
import isLogin from "../../middlewares/isLogin.js";
import isAdmin from "../../middlewares/isAdmin.js";

const adminRoutes = express.Router();

adminRoutes.get("/", isLogin, getAdminsCtrl);
adminRoutes.get("/profile", isLogin, isAdmin, getAdminProfileCtrl);
adminRoutes.post("/register", registerAdminCtrl);
adminRoutes.post("/login", loginAdminCtrl);
adminRoutes.put("/update/:id", isLogin, isAdmin, updateAdminCtrl);
adminRoutes.put("/suspend/teacher/:id", isLogin, isAdmin, adminSuspendTeacherCtrl);
adminRoutes.put("/unsuspend/teacher/:id", isLogin, isAdmin, adminUnsuspendTeacherCtrl);
adminRoutes.put("/withdraw/teacher/:id", isLogin, isAdmin, adminWithdrawTeacherCtrl);
adminRoutes.put("/unwithdraw/teacher/:id", isLogin, isAdmin, adminUnwithdrawTeacherCtrl);
adminRoutes.put("/publish/exam/:id", isLogin, isAdmin, adminPublishExamCtrl);
adminRoutes.put("/unpublish/exam/:id", isLogin, isAdmin, adminUnpublishExamCtrl);
adminRoutes.delete("/delete/:id", isLogin, isAdmin, deleteAdminCtrl);

export default adminRoutes;
