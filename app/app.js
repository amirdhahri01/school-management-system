import express from "express";
import morgan from "morgan";
import adminRoutes from "../routers/Staff/adminRouter.js";

const app = express();
//====Middleware====
app.use(morgan("dev"));
app.use(express.json());
//====Routes===
app.use("/api/v1/admins/", adminRoutes)

export default app;
