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

const subjectRoutes = express.Router();

subjectRoutes.get("/", isLogin, isAdmin, getSubjectsCtrl);
subjectRoutes.post("/:programID", isLogin, createSubjectCtrl);
subjectRoutes.route("/:id")
  .get(isLogin, isAdmin, getSubjectCtrl)
  .put(isLogin, isAdmin, updateSubjectCtrl)
  .delete(isLogin, isAdmin, deleteSubjectCtrl);

export default subjectRoutes;
