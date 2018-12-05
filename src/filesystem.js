'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');

const readFile = util.promisify(fs.readFile);


class FileSystem {
    async serve(relativePath) {
        if (relativePath === '/') {
            relativePath = '/index.html';
        }
        
        if (relativePath.startsWith('/') && relativePath.indexOf('..') < 0) {
            const absolutePath = path.join('public', relativePath);
            
            if (fs.existsSync(absolutePath)) {
                let contentType;
                let isBinary = false;
                
                switch (path.extname(absolutePath)) {
                    case '.css':
                        contentType = 'text/css';
                        break;
                        
                    case '.html':
                        contentType = 'text/html';
                        break;
                        
                    case '.ico':
                        contentType = 'image/x-icon';
                        break;
                        
                    case '.js':
                        contentType = 'text/javascript';
                        break;

                    default:
                        contentType = 'text/plain';
                        break;
                }
                
                return {
                    statusCode: 200,
                    headers: { 'Content-Type': contentType },
                    body: isBinary? (await readFile(absolutePath, 'utf8')): (await readFile(absolutePath, 'utf8'))
                };
            }
        }
        return {
            statusCode: 404,
            body: 'NotFound'
        };
    }    
}

module.exports = FileSystem;
