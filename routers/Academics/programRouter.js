import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import {
  createProgramCtrl,
  getProgramsCtrl,
  getProgramCtrl,
  updateProgramCtrl,
  deleteProgramCtrl,
} from "../../controllers/Academics/programCtrl.js";

const ProgramRoutes = express.Router();
ProgramRoutes.route("/")
  .get(isLogin, getProgramsCtrl)
  .post(isLogin, createProgramCtrl);

ProgramRoutes.route("/:id")
  .get(isLogin, getProgramCtrl)
  .put(isLogin, updateProgramCtrl)
  .delete(isLogin, deleteProgramCtrl);

export default ProgramRoutes;
