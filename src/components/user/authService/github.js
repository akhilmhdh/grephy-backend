import axios from "axios";

// To get the access token frm github
const getAccessToken = async (code) => {
  const { data } = await axios({
    url: "https://github.com/login/oauth/access_token",
    method: "post",
    params: {
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SEC,
      code,
    },
    headers: {
      accept: "application/json",
    },
  });
  return data;
};

// using token getting the user profile data
const getUserInfo = async (accessToken) => {
  const { data } = await axios({
    url: "https://api.github.com/user",
    method: "get",
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  return data;
};

export default {
  getAccessToken,
  getUserInfo,
};
