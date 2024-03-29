import axios from 'axios';

export const httpRequest = async ({ baseUrl }) => {
  try {
    return axios.create({
      baseURL: baseUrl,
    });
  } catch (error) {
    throw new Error('Error execute request');
  }
};
