/* eslint-disable no-underscore-dangle */
import googleService from "./authService/google";
import githubService from "./authService/github";

import JWT from "../utils/jwt";

import UserSchema from "./userValidator";
import userDAL from "./userDAL";

// google authentication
const googleOauth = async (code) => {
  const {
    data: { id, name, email },
  } = await googleService.getUserDetails(code);
  // user schema validator
  const { error, value } = UserSchema.validate({
    uID: id,
    name,
    email,
    provider: "google",
  });
  if (error) {
    throw error;
  }
  // to user collection
  const user = await userDAL.UserLogin(value);
  const token = JWT.JWTEncode({ userID: user._id });
  return token;
};

// github authentication
const githubOauth = async (code) => {
  // eslint-disable-next-line camelcase
  const { access_token } = await githubService.getAccessToken(code);
  const { id, name, email } = await githubService.getUserInfo(access_token);
  // user schema validator
  const { error, value } = UserSchema.validate({
    uID: id.toString(),
    name,
    email,
    provider: "github",
  });
  if (error) {
    throw error;
  }
  // to user collection
  const user = await userDAL.UserLogin(value);
  const token = JWT.JWTEncode({ userID: user._id });
  return token;
};

export default {
  googleOauth,
  githubOauth,
};
