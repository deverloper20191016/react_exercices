import axios from "../axios/axios-base";

export const getData = (url) => {
  return axios.get(url);
};
