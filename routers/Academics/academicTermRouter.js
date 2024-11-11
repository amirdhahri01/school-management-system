import express from "express";
import isLogin from "../../middlewares/isLogIn.js";
import {
  createAcademicTermCtrl,
  getAcademicTermsCtrl,
  getAcademicTermCtrl,
  updateAcademicTermCtrl,
  deleteAcademicTermCtrl,
} from "../../controllers/Academics/academicTermCtrl.js";

const academicTermRoutes = express.Router();
academicTermRoutes
  .route("/")
  .get(isLogin, getAcademicTermsCtrl)
  .post(isLogin, createAcademicTermCtrl);

academicTermRoutes
  .route("/:id")
  .get(isLogin, getAcademicTermCtrl)
  .put(isLogin, updateAcademicTermCtrl)
  .delete(isLogin, deleteAcademicTermCtrl);

export default academicTermRoutes;
