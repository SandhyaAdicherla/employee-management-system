import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:5000'
});
api.interceptors.response.use(
   (response) => response ,
   err => {
     if(err.status == 401){
         localStorage.removeItem("token");
         localStorage.removeItem("user");

          window.location.href = "/login";
     }

    return Promise.reject(err);
   }
)
export default api;