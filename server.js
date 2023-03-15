const http =require('http');

const app = require('./app');

const PORT = 8000;

const server = http.createServer(app);

server.listen(PORT)