/* eslint-disable no-underscore-dangle */
import googleService from './authService/google';
import githubService from './authService/github';

import JWT from '../utils/jwt';
import { ErrorHandler } from '../utils/error';

import UserSchema from './userValidator';
import userDAL from './userDAL';

// google authentication
const googleOauth = async (code: string): Promise<string> => {
    const {
        err,
        userInfo: {
            data: { id, name, email }
        }
    } = await googleService.getUserDetails(code);
    if (err) throw new ErrorHandler(404, 'Google api failed');

    // user schema validator
    const { error, value } = UserSchema.validate({
        uID: id,
        name,
        email,
        provider: 'google'
    });
    if (error) throw new ErrorHandler(417, 'user validation failed');

    // to user collection
    const user = await userDAL.UserLogin(value);
    const userID = user._id ? user._id : user.ops[0]._id;
    const token = JWT.JWTEncode({ userID });
    return token;
};

// github authentication
const githubOauth = async (code: string): Promise<string> => {
    // eslint-disable-next-line camelcase
    const { access_token } = await githubService.getAccessToken(code);
    const { id, name, email } = await githubService.getUserInfo(access_token);
    // user schema validator
    const { error, value } = UserSchema.validate({
        uID: id.toString(),
        name,
        email,
        provider: 'github'
    });
    if (error) throw new ErrorHandler(417, 'user validation failed');

    // to user collection
    const user = await userDAL.UserLogin(value);
    const userID = user._id ? user._id : user.ops[0]._id;
    const token = JWT.JWTEncode({ userID });
    return token;
};

export default {
    googleOauth,
    githubOauth
};
