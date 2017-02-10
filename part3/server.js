var http = require("http");
var fs = require("fs");
var url = require("url");

http.createServer(function(request, response){
    // url path
    var pathname = url.parse(request.url).pathname;

    // print the file name
    console.log("Request for"+ pathname + "received.");

    // read requested file from file system
    fs.readFile(pathname.substr(1),function(err, data){
        if(err){
            console.log(err);
            response.writeHead(404, {'Content-Type' : 'text/html'});
        }
        else{
            response.writeHead(404, {'Content-Type' : 'text/html'});

            // write the content of file to response body
            response.write(data.toString());
        }
        response.end();
    });

}).listen(8081);

// web server running
console.log("Server running at http://127.0.0.1:8081/");

