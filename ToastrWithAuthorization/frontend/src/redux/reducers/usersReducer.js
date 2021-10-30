import axiosService from "../../services/axiosService";
var initialState = {
    users: []
};

const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case "LOAD": {
            return {
                users: action.payload 
            };
        }
        default: { return state };
    }
}

export default usersReducer;