import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import {
  createSubjectCtrl,
  getSubjectsCtrl,
  getSubjectCtrl,
  updateSubjectCtrl,
  deleteSubjectCtrl,
} from "../../controllers/Academics/subjectCtrl.js";
import isAdmin from "../../middlewares/isAdmin.js";

const SubjectRoutes = express.Router();

SubjectRoutes.get("/", isLogin, isAdmin, getSubjectsCtrl);
SubjectRoutes.post("/:programID", isLogin, createSubjectCtrl);
SubjectRoutes.route("/:id")
  .get(isLogin, isAdmin, getSubjectCtrl)
  .put(isLogin, isAdmin, updateSubjectCtrl)
  .delete(isLogin, isAdmin, deleteSubjectCtrl);

export default SubjectRoutes;
