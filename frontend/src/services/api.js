import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:5000'
});
api.interceptors.response.use(
  (response) => response,

  (error) => {

    if (
      error.response?.status === 401
    ) {

      const currentPath =
        window.location.pathname;

      if (
        currentPath !== "/login"
      ) {

        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        window.location.href =
          "/login";
      }

    }

    return Promise.reject(error);

  }
);
export default api;