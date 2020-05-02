import googleService from "./authService/google";
import githubService from "./authService/github";

const googleOauth = async (code) => {
  const userInfo = await googleService.getUserDetails(code);
  return userInfo;
};

const githubOauth = async (code) => {
  // eslint-disable-next-line camelcase
  const { access_token } = await githubService.getAccessToken(code);
  const userInfo = await githubService.getUserInfo(access_token);
  return userInfo;
};

export default {
  googleOauth,
  githubOauth,
};
