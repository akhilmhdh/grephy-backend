import jwt from "jsonwebtoken";

// set of jwt functions shared by components
const JWTEncode = (data: string | number): string => {
  return jwt.sign(data, process.env.JWT_SECRET);
};

const JWTDecode = (data: string | number): string => {
  return jwt.verify(data, process.env.JWT_SECRET);
};

export default {
  JWTEncode,
  JWTDecode,
};
