import shortid from "shortid";

const toastReducer = (state = [], action) => {
    switch(action.type) 
    {
        case "ADD_FLASH_MESSAGE": {
            return [
                ...state,
                {
                    id: shortid.generate(),
                    type: action.message.type,
                    text: action.message.text
                }
            ]
        }
        case "DELETE_FLASH_MESSAGE": {
            var flashes = [];
            state.map((element, index) => {
                if(element.id !== action.id) {
                    flashes.push(element);
                }
            });
            return flashes;
        }
        default: return state;
    }
}

export default toastReducer;