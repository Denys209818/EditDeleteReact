import axios from "axios";

const axiosCreate =  axios.create({
    baseURL: '/',
    headers: { 'Content-Type': 'application/json' }
});

export default axiosCreate;