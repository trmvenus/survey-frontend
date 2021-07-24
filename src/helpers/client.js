import axios from 'axios';

import authHeader from './authHeader';
export function client(endpoint, { method, body, contentType='application/json', ...customConfig } = {}) {
    const options = {
        url: process.env.REACT_APP_API_URL + endpoint,
        method,
        ...customConfig,
        data: body,
        headers: authHeader(contentType),
    }

    const response = axios(options);

    return response;
}
export function client1(endpoint, { method, body, contentType='application/json', ...customConfig } = {}) {
    const options = {
        url: process.env.REACT_APP_API_URL + endpoint,
        method,
        ...customConfig,
        data: body,
        headers: authHeader(contentType),
    }

    const response = axios(options);

    return response;
}
client.get = function (endpoint, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'GET' })
}
client1.post = function (endpoint, body, customConfig = { responseType: 'blob'}) {
    return client1(endpoint, { ...customConfig, method: 'POST', body })
}
client.post = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'POST', body })
}

client.postForm = function (endpoint, body, customConfig = {}) {
    return client(endpoint, {method: 'POST', body, contentType: false})
}

client.put = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'PUT', body })
}

client.delete = function (endpoint, body, customConfig = {}) {
    return client(endpoint, { ...customConfig, method: 'DELETE', body })
}

