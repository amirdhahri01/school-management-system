import express from "express";
import {
  adminTogglePublishExamResultsCtrl,
  checkExamResultsCtrl,
  getExamResultsCtrl,
} from "../../controllers/Academics/examResultsCtrl.js";
import roleRestriction from "../../middlewares/roleRestriction.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import Student from "../../models/Staff/Student.js";
import Admin from "../../models/Staff/Admin.js";

const examResultsRoutes = express.Router();
examResultsRoutes.get("/", isAuthenticated(Student), roleRestriction("student"), getExamResultsCtrl);
examResultsRoutes.get(
  "/:examResultID/checking",
  isAuthenticated(Student), roleRestriction("student"),
  checkExamResultsCtrl
);
examResultsRoutes.put(
  "/:examResultID/admin-publish",
  isAuthenticated(Admin), roleRestriction("admin"),
  adminTogglePublishExamResultsCtrl
);
export default examResultsRoutes;
