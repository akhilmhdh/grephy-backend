/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

// set of jwt functions shared by components
const JWTEncode = (data: any): string => {
    return jwt.sign(data, process.env.JWT_SECRET);
};

const JWTDecode = (data: string): any => {
    return jwt.verify(data, process.env.JWT_SECRET) as string;
};

export default {
    JWTEncode,
    JWTDecode
};
