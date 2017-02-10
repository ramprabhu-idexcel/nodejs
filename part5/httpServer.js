// loading Http module
var http = require("http");

// returns new web server object
var server = http.createServer(function(req, res){
    // response header
    res.writeHead(200, {"Content-type": "text/html"});

    // response body
    res.write("<h1>Hello, World</h1>");

    // response end
    res.end("<b> Response ended </b>");
});

// listen post
server.listen(3000);

console.log("server listening localhost: 3000");