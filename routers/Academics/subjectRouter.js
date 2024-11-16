import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import {
  createSubjectCtrl,
  getSubjectsCtrl,
  getSubjectCtrl,
  updateSubjectCtrl,
  deleteSubjectCtrl,
} from "../../controllers/Academics/subjectCtrl.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import roleRestriction from "../../middlewares/roleRestriction.js";
import Admin from "../../models/Staff/Admin.js";

const subjectRoutes = express.Router();

subjectRoutes.get("/", isAuthenticated(Admin), roleRestriction("admin"), getSubjectsCtrl);
subjectRoutes.post("/:programID", isLogin, createSubjectCtrl);
subjectRoutes.route("/:id")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getSubjectCtrl)
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateSubjectCtrl)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteSubjectCtrl);

export default subjectRoutes;
