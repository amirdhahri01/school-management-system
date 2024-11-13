import express from "express";
import morgan from "morgan";
import adminRoutes from "../routers/Staff/adminRouter.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";
import academicYearRoutes from "../routers/Academics/academicYearRouter.js";
import academicTermRoutes from "../routers/Academics/academicTermRouter.js";
import classLevelRoutes from "../routers/Academics/classLevelRouter.js";
import programRoutes from "../routers/Academics/programRouter.js";
import subjectRoutes from "../routers/Academics/subjectRouter.js";
import yearGroupRoutes from "../routers/Academics/yearGroupRouter.js";
import teacherRoutes from "../routers/Staff/teacherRouter.js";
import examRoutes from "../routers/Academics/examRouter.js";
import studentRoutes from "../routers/Students/studentRouter.js";
import questionRoutes from "../routers/Academics/questionRouter.js";

const app = express();
//====Middleware====
app.use(morgan("dev"));
app.use(express.json());
//====Routes===
app.use("/api/v1/admins/", adminRoutes);
app.use("/api/v1/academic-years/", academicYearRoutes);
app.use("/api/v1/academic-terms/", academicTermRoutes);
app.use("/api/v1/class-levels/", classLevelRoutes);
app.use("/api/v1/programs/", programRoutes);
app.use("/api/v1/subjects/", subjectRoutes);
app.use("/api/v1/year-groups/", yearGroupRoutes);
app.use("/api/v1/teachers/", teacherRoutes);
app.use("/api/v1/exams/", examRoutes);
app.use("/api/v1/students/", studentRoutes);
app.use("/api/v1/questions/", questionRoutes);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
