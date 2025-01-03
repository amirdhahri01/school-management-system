import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    return err ? false : decoded;
  });
};

export default verifyToken;
