'use strict';

class Api {
    async serve(method, path, headers, query, body) {
        let response;
        
        if (method === 'GET' && path.toLowerCase() === '/api/v1/test') {
            response = {
              statusCode: 200,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ method, path, headers, query, body })
            };
        } else {
            response = {
                statusCode: 404,
                body: 'NotFound'
            };
        }
        return response;
    }    
}

module.exports = Api;