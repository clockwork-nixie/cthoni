'use strict';

const Api = require('./src/api');
const FileSystem = require('./src/filesystem');

const api = new Api();
const fileSystem = new FileSystem();



exports.handler = async (event) => {
    let response;
    
    try {
        if (event && event.path && event.path.startsWith('/api')) {
            response = await api.serve(
                event.httpMethod, 
                event.path, 
                event.headers,
                event.queryStringParameters,
                event.body);
        } else {
            response = await fileSystem.serve(event.path || '/');
        }
    } catch (error) {
        response = {
            statusCode: 500,
            body: JSON.stringify({ message: error.message || 'Unknown Error'})
        };
    }
    return response;
};
