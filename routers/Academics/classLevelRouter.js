import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import {
  createClassLevelCtrl,
  getClassLevelsCtrl,
  getClassLevelCtrl,
  updateClassLevelCtrl,
  deleteClassLevelCtrl,
} from "../../controllers/Academics/classLevelCtrl.js";

const classLevelRoutes = express.Router();
classLevelRoutes
  .route("/")
  .get(isLogin, getClassLevelsCtrl)
  .post(isLogin, createClassLevelCtrl);

classLevelRoutes
  .route("/:id")
  .get(isLogin, getClassLevelCtrl)
  .put(isLogin, updateClassLevelCtrl)
  .delete(isLogin, deleteClassLevelCtrl);

export default classLevelRoutes;
