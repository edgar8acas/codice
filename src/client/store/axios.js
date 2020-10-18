import axios from "axios";
import store from "../store/index";
import { LOGOUT } from "../store/action-types";

let instance;
if (!instance) {
  instance = axios.create();
}

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      //Unauthorized, token expired
      store.commit(`auth/${LOGOUT}`);
    }
    return Promise.reject(error);
  }
);

export default instance;
