var http = require("http");

http.createServer(function(request, response){
   // send Http header
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // send response body as "Hello, World !"
    response.end("Hello, World !");
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');