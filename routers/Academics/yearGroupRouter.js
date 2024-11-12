import express from "express";
import isLogin from "../../middlewares/isLogin.js";
import {
  createYearGroupCtrl,
  getYearGroupsCtrl,
  getYearGroupCtrl,
  updateYearGroupCtrl,
  deleteYearGroupCtrl,
} from "../../controllers/Academics/yearGroupCtrl.js";

const YearGroupRoutes = express.Router();
YearGroupRoutes.route("/")
  .get(isLogin, getYearGroupsCtrl)
  .post(isLogin, createYearGroupCtrl);

YearGroupRoutes.route("/:id")
  .get(isLogin, getYearGroupCtrl)
  .put(isLogin, updateYearGroupCtrl)
  .delete(isLogin, deleteYearGroupCtrl);

export default YearGroupRoutes;
