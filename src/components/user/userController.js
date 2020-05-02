import googleService from "./authService/google";

import userService from "./userService";

const googleAuth = (req, res, next) => {
  const url = googleService.getConnectionURL();
  res.redirect(url);
  next();
};

const googleAuthCallback = async (req, res, next) => {
  const { code } = req.query;
  try {
    const info = await userService.googleOauth(code);
    res.send(info).status(200);
    next();
  } catch (error) {
    res.send(error).status(500);
    next(error);
  }
};

const githubAuth = (req, res, next) => {
  const scope = ["read:user", "user:email"].join(" ");
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=${scope}`
  );
  next();
};

const githubAuthCallback = async (req, res, next) => {
  const { code } = req.query;
  try {
    const info = await userService.githubOauth(code);
    res.send(info).status(200);
    next();
  } catch (error) {
    res.send(error).status(500);
    next(error);
  }
  next();
};

export default {
  googleAuth,
  githubAuth,
  googleAuthCallback,
  githubAuthCallback,
};
