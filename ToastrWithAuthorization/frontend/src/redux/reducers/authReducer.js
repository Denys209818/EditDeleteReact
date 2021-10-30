var initialState = {
    isDrag: false,
    user: null,
    isAuth: false,
    name: ''
}

const authReducer = (state=initialState, action) => {
    switch(action.type) 
    {
        case "REGISTER":{
            return {
                ...state,
                user: action.payload,
                isAuth: true,
                name: action.payload.name
            }
        }
        case "CHANGE_NAME":{
            return {
                ...state,
                name: action.payload
            }
        }
        case "LOGOUT":{
            return {
                ...state,
                user: null,
                isAuth: false,
            }
        }
        case "DRAG_IN": 
        {
            return {
                ...state,
                isDrag: true
            };
        }
        case "DRAG_OUT": 
        {
            return {
                ...state,
                isDrag: false
            };
        }
    }
return state;
}

export default authReducer;