import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import {
  createAcademicYearCtrl,
  getAcademicYearsCtrl,
  getAcademicYearCtrl,
  updateAcademicYearCtrl,
  deleteAcademicYearCtrl,
} from "../../controllers/Academics/academicYearCtrl.js";

const academicYearRoutes = express.Router();
academicYearRoutes
  .route("/")
  .get(isLogin, getAcademicYearsCtrl)
  .post(isLogin, createAcademicYearCtrl);

academicYearRoutes
  .route("/:id") 
  .get(isLogin, getAcademicYearCtrl)
  .put(isLogin, updateAcademicYearCtrl)
  .delete(isLogin, deleteAcademicYearCtrl);

export default academicYearRoutes;
