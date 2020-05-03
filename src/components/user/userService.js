import googleService from "./authService/google";
import githubService from "./authService/github";

import JWT from "../utils/jwt";

import userDAL from "./userDAL";

// google authentication
const googleOauth = async (code) => {
  const {
    data: { id, name, email },
  } = await googleService.getUserDetails(code);
  const user = await userDAL.UserLogin(id, name, email, "google");
  const token = JWT.JWTEncode({ id: user._id });
  return token;
};

// github authentication
const githubOauth = async (code) => {
  // eslint-disable-next-line camelcase
  const { access_token } = await githubService.getAccessToken(code);
  const { id, name, email } = await githubService.getUserInfo(access_token);
  const user = await userDAL.UserLogin(id, name, email, "github");
  const token = JWT.JWTEncode({ id: user._id });
  return token;
};

export default {
  googleOauth,
  githubOauth,
};
