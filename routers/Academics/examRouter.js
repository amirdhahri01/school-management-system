import express from "express";
import {
  createExamCtrl,
  getExamCtrl,
  getExamsCtrl,
  updateExamCtrl,
} from "../../controllers/Academics/examCtrl.js";
import Teacher from "../../models/Staff/Teacher.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import roleRestriction from "../../middlewares/roleRestriction.js";

const examRoutes = express.Router();
examRoutes
  .route("/")
  .get(isAuthenticated(Teacher), roleRestriction("teacher"), getExamsCtrl)
  .post(isAuthenticated(Teacher), roleRestriction("teacher"), createExamCtrl);

examRoutes
  .route("/:examID")
  .get(isAuthenticated(Teacher), roleRestriction("teacher"), getExamCtrl)
  .put(isAuthenticated(Teacher), roleRestriction("teacher"), updateExamCtrl);
//   .delete(isLogin, deleteClassLevelCtrl);

export default examRoutes;
