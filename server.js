import http from "http";
import app from "./app/app.js";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 2020;

//====Server====
const server = http.createServer(app);
server.listen(PORT, console.log(`Server is running on port ${PORT}`));
//====DB====
dbConnect();
