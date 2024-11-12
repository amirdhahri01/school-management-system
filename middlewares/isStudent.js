import Student from "../models/Staff/Student.js";

const isStudent = async (req, res, next) => {
  const studentFound = await Student.findById(req.userAuth?._id);
  if (studentFound?.role !== "student") {
    next(new Error("Access denied, Student only"));
  }
  next();
};

export default isStudent;