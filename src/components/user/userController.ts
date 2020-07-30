// to generate the custom url for google oauth
import { RequestHandler } from 'express';
import googleService from './authService/google';

import userService from './userService';

// google oauth controller
const googleAuth: RequestHandler = (req, res, next) => {
    const url = googleService.getConnectionURL();
    res.redirect(url);
};

// google redirect controller
const googleAuthCallback: RequestHandler = async (req, res, next) => {
    // parse the unqiue code from url
    const { code } = req.query;
    try {
        const token = await userService.googleOauth(code as string);
        req.session.user = token;
        res.json({ login: 'success' }).status(200);
    } catch (error) {
        next({ statusCode: 500, message: error });
    }
};

// github oauth controller
const githubAuth: RequestHandler = (req, res, next) => {
    const scope = ['read:user', 'user:email'].join(' ');
    res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=${scope}`
    );
};

// github oauth callback controller
const githubAuthCallback: RequestHandler = async (req, res, next) => {
    const { code } = req.query;
    try {
        const token = await userService.githubOauth(code as string);
        req.session.user = token;
        res.json({ login: 'success' }).status(200);
    } catch (error) {
        next({ statusCode: 500, message: error });
    }
    next();
};

// logout function

const logOut: RequestHandler = (req, res, next) => {
    if (req.session.user) {
        req.session.user = null;
    }
    res.json({ logout: 'success' }).status(200);
};

export default {
    googleAuth,
    githubAuth,
    googleAuthCallback,
    githubAuthCallback,
    logOut
};
