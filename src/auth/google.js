import { google } from "googleapis";

const oauth2 = google.oauth2("v2");

const Oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SEC,
  process.env.GOOGLE_REDIRECT_URL // this must match your google api settings
);

const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
];

const getConnectionURL = () => {
  return Oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: defaultScope,
  });
};

const getUserDetails = async (code) => {
  const { tokens } = await Oauth2Client.getToken(code);
  Oauth2Client.setCredentials(tokens);
  const userInfo = await oauth2.userinfo.get({ auth: Oauth2Client });
  if (userInfo.status === 200) return userInfo;
  throw new Error(userInfo.status);
};

export default (app) => {
  app.get("/auth/google", (req, res) => {
    const url = getConnectionURL();
    res.redirect(url);
  });

  app.get("/auth/google/callback", async (req, res) => {
    const { code } = req.query;
    const user = await getUserDetails(code);
    res.send(user);
  });
};
