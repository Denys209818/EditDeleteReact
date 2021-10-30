import axiosCreate from "./createAxios"

class AxiosService {

    send = (path, data) => {
        return axiosCreate.post(path, data);
    }

    sendWithoutData = (path) => {
        return axiosCreate.post(path);
    }

    sendImage = (path, data) => {
        var formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
        });

        return axiosCreate.post(path, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
}

export default new AxiosService();