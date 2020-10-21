import axios from "../store/axios";

export const http = function (apiUrl, httpOptions) {
  return axios.get(apiUrl, httpOptions);
};
