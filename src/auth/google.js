// oauth library provided by google
import { google } from "googleapis";

const oauth2 = google.oauth2("v2");
// setting server oauth
const Oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SEC,
  process.env.GOOGLE_REDIRECT_URL // this must match your google api settings
);

// profile and email scope
const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

// redirect url to google
const getConnectionURL = () => {
  return Oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScope,
  });
};

// getting data from the callback url
const getUserDetails = async (code) => {
  const { tokens } = await Oauth2Client.getToken(code);
  Oauth2Client.setCredentials(tokens);
  const userInfo = await oauth2.userinfo.get({ auth: Oauth2Client });
  if (userInfo.status === 200) return userInfo;
  throw new Error(userInfo.status);
};

export default (app) => {
  // routes to login via google
  app.get("/auth/google", (req, res) => {
    const url = getConnectionURL();
    res.redirect(url);
  });

  // callback url route
  app.get("/auth/google/callback", async (req, res) => {
    const { code } = req.query;
    const user = await getUserDetails(code);
    res.send(user);
  });
};
