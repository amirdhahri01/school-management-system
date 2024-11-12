import Student from "../models/Staff/Student.js";
import verifyToken from "../utils/verifyToken.js";

const isStudentLogin = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  
  const verifiedToken = verifyToken(token);
  if (!verifiedToken) {
    next(new Error("Token expired/invalid"));
  }
  const user = await Student.findById(verifiedToken.id).select("name email role");
  req.userAuth = user;
  next();
};

export default isStudentLogin;
