import axios from 'axios';

import { API } from '../../configs/api';
import { apiErrorsParser } from '../apiErrorsParser';

export class ApiService {
    constructor () {
        this.axios = axios.create({
            baseURL: [API.protocol, API.basePath, ':', API.port, '/', API.v].join(''),
            timeout: 30000
        });
    }

    setRequestHeaders (isFormData = false) {
        const api_token = localStorage.getItem('api_token');

        if (api_token) {
            this.axios.defaults.headers.common['Authorization'] = `Bearer ${api_token}`;
        }

        this.axios.defaults.headers.common['Accept'] = 'application/json';

        if (!isFormData) {
            this.axios.defaults.headers.common['Content-Type'] = 'application/json';
        }
    }

    transformBody(body) {
        if (!(body && body instanceof FormData)) {
            this.axios.defaults.headers.common['Content-Type'] = 'application/json';
        }
    }

    get(relUrl, data, conf, baseUrl) {
        baseUrl = baseUrl || this.axios.defaults.baseURL;

        return this
            .axios
            .get(baseUrl + relUrl, data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                this.handleError(error);
            });
    }

    post(relUrl, data, conf, baseUrl) {
        baseUrl = baseUrl || this.axios.defaults.baseURL;

        return this
            .axios
            .post(baseUrl + relUrl, data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                this.handleError(error);
            });
    }

    put(relUrl, data, conf, baseUrl) {
        baseUrl = baseUrl || this.axios.defaults.baseURL;

        return this
            .axios
            .put(baseUrl + relUrl, data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                this.handleError(error);
            });
    }

    delete(relUrl, data, conf, baseUrl) {
        baseUrl = baseUrl || this.axios.defaults.baseURL;

        return this
            .axios
            .delete(baseUrl + relUrl, data)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                this.handleError(error);
            });
    }

    handleError(error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            let errorObj = this.handleBadStatus(error.response);

            if (errorObj)
                throw errorObj;

            //console.log(error.response.data);
            //console.log(error.response.headers);
            //console.log(error.response.status);
        }
        else {
            if (error.request) {
            // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the 
            // browser and an instance of http.ClientRequest in node.js
                console.log(error.request);

                if (error && error.message == "Network Error") {
                    throw new Error('Помилка під час спроби зєднання з сервером. Перевірте налаштування мережі!');
                }
                else {
                    throw new Error(error.message);
                }
            }
            else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);

                throw new Error(error.message);
            }
        }
    }

    handleBadStatus(error) {
        let errObj = null;

        switch (error.status) {
            case 401: {
                if (localStorage.getItem('api_token')) {
                    errObj = new Error('Час вашої сессії вичерпано!');

                    localStorage.removeItem('api_token');
                }
                else {
                    let errorsMsg = error.data && error.data.errors ? apiErrorsParser(error.data.errors) : 'Unknown error';

                    errObj = new Error(errorsMsg);
                }

                break;
            }

            case 500:
                console.log(error);

                errObj = new Error('Невідома помилка на сервері!');

                break;

            default:
                errObj = error;
                break;
        }

        return errObj;
    }
}
