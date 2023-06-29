// import { httpRequest } from '../../../../config/index.js';
import axios from 'axios';
import 'dotenv/config';

export const githubCallback = async ({ requestToken }) => {
  try {
    //  const baseUrl = `https://github.com`;
    //  const config = {
    //    headers: {
    //      accept: 'application/json',
    //    },
    //  };
    //  const api = await httpRequest({ baseUrl });

    const githubApiResponse = await axios({
      method: 'post',
      url: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${requestToken}`,
      headers: {
        accept: 'application/json',
      },
    });
    console.log('requestToken ==>', requestToken);
    console.log('githubApiResponse.data ==>', githubApiResponse.data);
    return githubApiResponse.data;
  } catch (error) {
    console.log('error ==>', error);
    throw new Error(error);
  }
};

export const getGithubUser = async ({ access_token }) => {
  try {
    //  const baseUrl = 'https://api.github.com';
    //  const api = await httpRequest({ baseUrl });
    //  const config = {
    //    headers: {
    //      Authorization: `token ${access_token}`,
    //    },
    //  };
    console.log('access_token ==>', access_token);
    const response = await axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
