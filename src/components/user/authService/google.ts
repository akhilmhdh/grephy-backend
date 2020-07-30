// oauth library provided by google
import { google } from 'googleapis';

const oauth2 = google.oauth2('v2');
// setting server oauth
const Oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SEC,
    process.env.GOOGLE_REDIRECT_URL // this must match your google api settings
);

// profile and email scope
const defaultScope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
];

// redirect url to google
const getConnectionURL = (): string => {
    return Oauth2Client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: defaultScope
    });
};

interface userDetails {
    err: number | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userInfo: any;
}

// getting data from the callback url
const getUserDetails = async (code: string): Promise<userDetails> => {
    const { tokens } = await Oauth2Client.getToken(code);
    Oauth2Client.setCredentials(tokens);
    const userInfo = await oauth2.userinfo.get({ auth: Oauth2Client });
    if (userInfo.status === 200) return { err: null, userInfo };
    return { err: userInfo.status, userInfo: null };
};

export default { getConnectionURL, getUserDetails };
