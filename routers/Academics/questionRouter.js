import express from "express";
import {
  createQuestionCtrl,
  getQuestionCtrl,
  getQuestionsCtrl,
  updateQuestionCtrl,
  deleteQuestionCtrl
} from "../../controllers/Academics/questionCtrl.js";
import Teacher from "../../models/Staff/Teacher.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import roleRestriction from "../../middlewares/roleRestriction.js";

const questionRoutes = express.Router();
questionRoutes.route("/").get(isAuthenticated(Teacher), roleRestriction("teacher"), getQuestionsCtrl);

questionRoutes
  .route("/:questionID")
  .get(isAuthenticated(Teacher), roleRestriction("teacher"), getQuestionCtrl)
  .put(isAuthenticated(Teacher), roleRestriction("teacher"), updateQuestionCtrl)
  .delete(isAuthenticated(Teacher), roleRestriction("teacher"), deleteQuestionCtrl);
questionRoutes
  .route("/:examID")
  .post(isAuthenticated(Teacher), roleRestriction("teacher"), createQuestionCtrl);

export default questionRoutes;
