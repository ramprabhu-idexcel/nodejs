var express = require("express");
var http = require("http");
var path = require("path");

var app = express();  // initialize express module

// attribute setter function
app.set("port", process.env.port || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.all("*", function(req,res){
    res.render("index", { title: "IGATE corporate university" });
});

http.createServer(app).listen(app.get("port"), function(){
    console.log("Express js server listening on port" +app.get("port"));
});

