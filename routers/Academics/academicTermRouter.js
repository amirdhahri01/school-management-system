import express from "express";
import {
  createAcademicTermCtrl,
  getAcademicsTermsCtrl,
  getAcademicTermCtrl,
  updateAcademicTermCtrl,
  deleteAcademicTermCtrl,
} from "../../controllers/Academics/academicTermCtrl.js";
import roleRestriction from "../../middlewares/roleRestriction.js";
import Admin from "../../models/Staff/Admin.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

const academicTermRoutes = express.Router();
academicTermRoutes
  .route("/")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getAcademicsTermsCtrl)
  .post(isAuthenticated(Admin), roleRestriction("admin"), createAcademicTermCtrl);

academicTermRoutes
  .route("/:id")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getAcademicTermCtrl)
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateAcademicTermCtrl)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteAcademicTermCtrl);

export default academicTermRoutes;
