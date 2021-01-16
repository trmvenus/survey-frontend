import axios from 'axios';

import authHeader from './authHeader';

export function client(endpoint, { method, body, ...customConfig } = {}) {
    const options = {
        url: process.env.REACT_APP_API_URL + endpoint,
        method,
        ...customConfig,
        data: body,
        headers: authHeader(),
    }

    const response = axios(options);
    return response;
}

client.get = function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'POST', body })
}

client.put = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'PUT', body })
}

client.delete = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'DELETE', body })
}
