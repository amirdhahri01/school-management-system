import Admin from "../models/Staff/Admin.js";
import verifyToken from "../utils/verifyToken.js";

const isLogin = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const verifiedToken = verifyToken(token);
  if (!verifiedToken) {
    next(new Error("Token expired/invalid"));
  }
  const user = Admin.findById(verifiedToken.id).select("name email role");
  req.userAuth = user;
  next();
};

export default isLogin;
