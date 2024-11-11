import Admin from "../models/Staff/Admin.js";

const isAdmin = async (req, res, next) => {
  const adminFound = Admin.findById(req.userAuth?.id);
  if (adminFound?.role === "admin") {
    next(new Error("Access denied, admin only"));
  }
  next();
};

export default isAdmin;
