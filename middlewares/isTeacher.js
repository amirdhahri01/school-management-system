import Teacher from "../models/Staff/Teacher.js";

const isTeacher = async (req, res, next) => {
  const teacherFound = Teacher.findById(req.userAuth?.id);
  if (teacherFound?.role !== "teacher") {
    next(new Error("Access denied, Teacher only"));
  }
  next();
}; 

export default isTeacher;
