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
import isAdmin from "../../middlewares/isAdmin.js";
import advancedResults from "../../middlewares/advancedResults.js";
import Admin from "../../models/Staff/Admin.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

const adminRoutes = express.Router();

adminRoutes.get("/", isAuthenticated(Admin), advancedResults(Admin, {}), getAdminsCtrl);
adminRoutes.get("/profile", isAuthenticated(Admin), isAdmin, getAdminProfileCtrl);
adminRoutes.post("/register", registerAdminCtrl);
adminRoutes.post("/login", loginAdminCtrl);
adminRoutes.put("/update/:id", isAuthenticated(Admin), isAdmin, updateAdminCtrl);
adminRoutes.put("/suspend/teacher/:id", isAuthenticated(Admin), isAdmin, adminSuspendTeacherCtrl);
adminRoutes.put("/unsuspend/teacher/:id", isAuthenticated(Admin), isAdmin, adminUnsuspendTeacherCtrl);
adminRoutes.put("/withdraw/teacher/:id", isAuthenticated(Admin), isAdmin, adminWithdrawTeacherCtrl);
adminRoutes.put("/unwithdraw/teacher/:id", isAuthenticated(Admin), isAdmin, adminUnwithdrawTeacherCtrl);
adminRoutes.put("/publish/exam/:id", isAuthenticated(Admin), isAdmin, adminPublishExamCtrl);
adminRoutes.put("/unpublish/exam/:id", isAuthenticated(Admin), isAdmin, adminUnpublishExamCtrl);
adminRoutes.delete("/delete/:id", isAuthenticated(Admin), isAdmin, deleteAdminCtrl);

export default adminRoutes;
