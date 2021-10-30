import axiosCreate from "../../services/createAxios";

export const AuthorizeUser = (token) => 
{
    if (token) {
        axiosCreate.defaults.headers.common["Authorization"] = "Bearer " + token
    }
    else {
        delete axiosCreate.defaults.headers.common["Authorization"];
    }
}
