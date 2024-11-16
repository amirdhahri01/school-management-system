import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import {
  createClassLevelCtrl,
  getClassLevelsCtrl,
  getClassLevelCtrl,
  updateClassLevelCtrl,
  deleteClassLevelCtrl,
} from "../../controllers/Academics/classLevelCtrl.js";
import Admin from "../../models/Staff/Admin.js";
import roleRestriction from "../../middlewares/roleRestriction.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

const classLevelRoutes = express.Router();
classLevelRoutes
  .route("/")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getClassLevelsCtrl)
  .post(isAuthenticated(Admin), roleRestriction("admin"), createClassLevelCtrl);

classLevelRoutes
  .route("/:id")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getClassLevelCtrl)
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateClassLevelCtrl)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteClassLevelCtrl);

export default classLevelRoutes;
