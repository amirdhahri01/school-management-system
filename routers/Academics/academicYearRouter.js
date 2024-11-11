import express from "express";
import isLogin from "../../middlewares/isLogIn.js";
import {
  createAcademicYearCtrl,
  getAcademicYearsCtrl,
  getAcademicYearCtrl,
  updateAcademicYearCtrl,
  deleteAcademicYearCtrl
} from "../../controllers/Academics/academicYearCtrl.js";

const academicYearRoutes = express.Router();

academicYearRoutes.post("/", isLogin, createAcademicYearCtrl);
academicYearRoutes.get("/", isLogin, getAcademicYearsCtrl);
academicYearRoutes.get("/:id", isLogin, getAcademicYearCtrl);
academicYearRoutes.put("/update/:id", isLogin, updateAcademicYearCtrl);
academicYearRoutes.delete("/delete/:id", isLogin, deleteAcademicYearCtrl);

export default academicYearRoutes;
