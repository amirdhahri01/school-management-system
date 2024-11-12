import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import {
  createAcademicTermCtrl,
  getAcademicsTermsCtrl,
  getAcademicTermCtrl,
  updateAcademicTermCtrl,
  deleteAcademicTermCtrl,
} from "../../controllers/Academics/academicTermCtrl.js";

const academicTermRoutes = express.Router();
academicTermRoutes
  .route("/")
  .get(isLogin, getAcademicsTermsCtrl)
  .post(isLogin, createAcademicTermCtrl);

academicTermRoutes
  .route("/:id")
  .get(isLogin, getAcademicTermCtrl)
  .put(isLogin, updateAcademicTermCtrl)
  .delete(isLogin, deleteAcademicTermCtrl);

export default academicTermRoutes;
