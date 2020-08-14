const http = require('http');
const app = require('./server.js');
const server = http.createServer(app);
const port = 3000;
server.listen(port);
//console debug output
console.debug('Server listening on port ' + port);