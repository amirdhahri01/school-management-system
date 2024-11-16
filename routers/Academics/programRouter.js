import express from "express";
import {
  createProgramCtrl,
  getProgramsCtrl,
  getProgramCtrl,
  updateProgramCtrl,
  deleteProgramCtrl,
} from "../../controllers/Academics/programCtrl.js";
import Admin from "../../models/Staff/Admin.js";
import isAuthenticated from "../../middlewares/isAuthenticated.js";
import roleRestriction from "../../middlewares/roleRestriction.js";

const programRoutes = express.Router();
programRoutes.route("/")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getProgramsCtrl)
  .post(isAuthenticated(Admin), roleRestriction("admin"), createProgramCtrl);

programRoutes.route("/:id")
  .get(isAuthenticated(Admin), roleRestriction("admin"), getProgramCtrl)
  .put(isAuthenticated(Admin), roleRestriction("admin"), updateProgramCtrl)
  .delete(isAuthenticated(Admin), roleRestriction("admin"), deleteProgramCtrl);

export default programRoutes;
