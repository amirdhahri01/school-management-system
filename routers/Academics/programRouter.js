import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import {
  createProgramCtrl,
  getProgramsCtrl,
  getProgramCtrl,
  updateProgramCtrl,
  deleteProgramCtrl,
} from "../../controllers/Academics/programCtrl.js";

const programRoutes = express.Router();
programRoutes.route("/")
  .get(isLogin, getProgramsCtrl)
  .post(isLogin, createProgramCtrl);

programRoutes.route("/:id")
  .get(isLogin, getProgramCtrl)
  .put(isLogin, updateProgramCtrl)
  .delete(isLogin, deleteProgramCtrl);

export default programRoutes;
