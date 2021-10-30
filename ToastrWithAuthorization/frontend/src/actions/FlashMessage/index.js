

const FlashMessage = (message) => {
    return {
        type: 'ADD_FLASH_MESSAGE',
        message
    };
}

export const FlashMessageDelete = (id) => {
    return {
        type: 'DELETE_FLASH_MESSAGE',
        id
    };
}

export default FlashMessage;