var http = require("http");

// options to be used by request

var options = {
    host: "localhost",
    port: "8081",
    path: "/index.html"
};

// callback function to be used to deal with response
var callback = function(response){
    var body = '';
    response.on('data', function(data){
       body += data;
    });

    response.on('end', function(){
       console.log(body);
    });

};

//make request to web server
var req = http.request(options, callback);
req.end();
