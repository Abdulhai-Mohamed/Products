import axios from "axios";
import store from "./../store";

// axios.defaults.baseURL = 'http://localhost:8080/api/';
// axios.defaults.headers['Accept-Language'] = localStorage.getItem('lang') || 'en';
let refresh = false;
// axios.interceptors.request.use(
//   (resp) => console.log(resp, "reqest response"),
//   async (error) => error
// );

axios.interceptors.response.use(
  (resp) => {
    return Promise.resolve(resp);
  },
  async (error) => {
    console.log(error, "inceptor err");

    if (error.response.status === 401 && !refresh) {
      refresh = true;
      const refreshToken = localStorage.getItem("Refresh token");

      if (refreshToken) {
        store.dispatch("auth/tryLogin");
      } else {
        alert("Please login again");
      }
    }

    refresh = false;
    return Promise.reject(error);
  }
);

export default axios;
