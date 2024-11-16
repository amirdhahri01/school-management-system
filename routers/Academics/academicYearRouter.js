import express from "express";
import {
  createAcademicYearCtrl,
  getAcademicYearsCtrl,
  getAcademicYearCtrl,
  updateAcademicYearCtrl,
  deleteAcademicYearCtrl,
} from "../../controllers/Academics/academicYearCtrl.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import Admin from "../../models/Staff/Admin.js";
import roleRestriction from "../../middlewares/roleRestriction.js";

const academicYearRoutes = express.Router();
academicYearRoutes
  .route("/")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getAcademicYearsCtrl)
  .post(isAuthenticated(Admin), roleRestriction("admin"), createAcademicYearCtrl);

academicYearRoutes
  .route("/:id")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getAcademicYearCtrl)
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateAcademicYearCtrl)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteAcademicYearCtrl);

export default academicYearRoutes;
