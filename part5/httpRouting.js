// create http module
var http = require("http");

// create a web server object
var server = http.createServer(function(req, res){
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path){
        case '':
            res.writeHead(200, {"Content-type": "text/html"});
            res.write("<h1>Home Page</h1>");
            res.end();
            break;
        case '/about':
            res.writeHead(200, {"Content-type": "text/html"});
            res.write("<h1>About us</h1>");
            res.end();
            break;
        default:
            res.writeHead(404, {"Content-type": "text/html"});
            res.end("<h1> Page Not Found </h1>");
            break;
    }
});

server.listen(4000);

console.log("Server is running on localhost:4000");
