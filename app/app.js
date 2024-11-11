import express from "express";
import morgan from "morgan";
import adminRoutes from "../routers/Staff/adminRouter.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHandler.js";

const app = express();
//====Middleware====
app.use(morgan("dev"));
app.use(express.json());
//====Routes===
app.use("/api/v1/admins/", adminRoutes);
app.use(notFound);
app.use(globalErrorHandler);
export default app;
