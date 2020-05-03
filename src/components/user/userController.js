// to generate the custom url for google oauth
import googleService from "./authService/google";

import userService from "./userService";

// google oauth controller
const googleAuth = (req, res, next) => {
  const url = googleService.getConnectionURL();
  res.redirect(url);
  next();
};

// google redirect controller
const googleAuthCallback = async (req, res, next) => {
  const { code } = req.query;
  try {
    const token = await userService.googleOauth(code);
    req.session.user = token;
    res.send("logged in").status(200);
    next();
  } catch (error) {
    res.send(error).status(500);
    next(error);
  }
};

// github oauth controller
const githubAuth = (req, res, next) => {
  const scope = ["read:user", "user:email"].join(" ");
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=${scope}`
  );
  next();
};

// github oauth callback controller
const githubAuthCallback = async (req, res, next) => {
  const { code } = req.query;
  try {
    const token = await userService.githubOauth(code);
    req.session.user = token;
    res.send("logged in").status(200);
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
