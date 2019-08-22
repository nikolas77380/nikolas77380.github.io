import axios from 'axios';
import {Config} from './../config/Config'
var config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

class Provider {

    async getFiles(userId, applicationId) {

        try {
            const response = await axios.get(`${Config.ProviderUrl}/files?userId=${userId}&applicationId=${applicationId}`, config);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}

export default new Provider();