import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import {
  createYearGroupCtrl,
  getYearGroupsCtrl,
  getYearGroupCtrl,
  updateYearGroupCtrl,
  deleteYearGroupCtrl,
} from "../../controllers/Academics/yearGroupCtrl.js";

const yearGroupRoutes = express.Router();
yearGroupRoutes.route("/")
  .get(isLogin, getYearGroupsCtrl)
  .post(isLogin, createYearGroupCtrl);

yearGroupRoutes.route("/:id")
  .get(isLogin, getYearGroupCtrl)
  .put(isLogin, updateYearGroupCtrl)
  .delete(isLogin, deleteYearGroupCtrl);

export default yearGroupRoutes;
