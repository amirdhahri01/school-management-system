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

const adminRoutes = express.Router();

adminRoutes.get("/", getAdminsCtrl);
adminRoutes.get("/:id", getAdminCtrl);
adminRoutes.post("/register", registerAdminCtrl);
adminRoutes.post("/login", loginAdminCtrl);
adminRoutes.put("/suspend/teacher/:id", adminSuspendTeacherCtrl);
adminRoutes.put("/unsuspend/teacher/:id", adminUnsuspendTeacherCtrl);
adminRoutes.put("/withdraw/teacher/:id", adminWithdrawTeacherCtrl);
adminRoutes.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacherCtrl);
adminRoutes.put("/publish/exam/:id", adminPublishExamCtrl);
adminRoutes.put("/unpublish/exam/:id", adminUnpublishExamCtrl);
adminRoutes.delete("/:id", deleteAdminCtrl);

export default adminRoutes;
