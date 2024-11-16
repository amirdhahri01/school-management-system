import express from "express";
import {
  createYearGroupCtrl,
  getYearGroupsCtrl,
  getYearGroupCtrl,
  updateYearGroupCtrl,
  deleteYearGroupCtrl,
} from "../../controllers/Academics/yearGroupCtrl.js";
import roleRestriction from "../../middlewares/roleRestriction.js";
import Admin from "../../models/Staff/Admin.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";

const yearGroupRoutes = express.Router();
yearGroupRoutes.route("/")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getYearGroupsCtrl)
  .post(isAuthenticated(Admin), roleRestriction("admin"), createYearGroupCtrl);

yearGroupRoutes.route("/:id")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getYearGroupCtrl)
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateYearGroupCtrl)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteYearGroupCtrl);

export default yearGroupRoutes;
