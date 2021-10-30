import { push } from "connected-react-router";
import axiosService from "../../services/axiosService";

export const LoadUsers = () => (dispatch) => 
{

    var resultPromise = axiosService.sendWithoutData('api/account/get');
    var elements;
    resultPromise.then(result => {
        elements = result.data.users.map((element, index) => {
            return {
                    firstname: element.firstname,
                    secondname: element.secondname,
                    phone: element.phone,
                    email: element.email,
                    id: element.id,
                    image: element.image
            };      
        });

        dispatch({type: "LOAD", payload: elements});
        dispatch(push("/"));
    });
}