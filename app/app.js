import express from "express";
import morgan from "morgan";
import adminRoutes from "../routers/Staff/adminRouter.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";
import academicYearRoutes from "../routers/Academics/academicYearRouter.js";
import academicTermRoutes from "../routers/Academics/academicTermRouter.js";
import ClassLevelRoutes from "../routers/Academics/classLevelRouter.js";
import ProgramRoutes from "../routers/Academics/programRouter.js";
import SubjectRoutes from "../routers/Academics/subjectRouter.js";
import YearGroupRoutes from "../routers/Academics/yearGroupRouter.js";
import teacherRoutes from "../routers/Academics/teacherRouter.js";

const app = express();
//====Middleware====
app.use(morgan("dev"));
app.use(express.json());
//====Routes===
app.use("/api/v1/admins/", adminRoutes);
app.use("/api/v1/academic-years/", academicYearRoutes);
app.use("/api/v1/academic-terms/", academicTermRoutes);
app.use("/api/v1/class-levels/", ClassLevelRoutes);
app.use("/api/v1/programs/", ProgramRoutes);
app.use("/api/v1/subjects/", SubjectRoutes);
app.use("/api/v1/year-groups/", YearGroupRoutes);
app.use("/api/v1/teachers/", teacherRoutes);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
