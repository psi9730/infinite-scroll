import axios from 'axios';
import { ParsedUrlQueryInput } from 'querystring';
// import { REST_API_URL } from '../config/constant';

export default function request(
    url: string,
    method = 'get',
    query?: ParsedUrlQueryInput,
    data?: any,
    config?: any
) {
    return axios({
        method,
        url,
        data,
        ...config
    })
        .then(response => {
            if (response.status !== 200) {
                throw response;
            }
            return response.data;
        })
        .catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
            } else {
                // Something happened in setting up the request that triggered an Error
            }
            alert(error.message);
            return Promise.reject(error);
        });
}
