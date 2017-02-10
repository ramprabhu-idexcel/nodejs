// imports event module
// access events module
var events = require("events");

// create an event emitter object
var eventEmitter = new events.EventEmitter();

var myCallback = function(data){
  console.log("Got data:"+ data);
};

// Bind event & event handler
eventEmitter.addListener("ram", myCallback);
// Here mycallback is a function which needs to be executed when event is emitted

// Bind event & event handler
eventEmitter.on("ram", myCallback);
// Here mycallback is a function which needs to be executed when event is emitted

// Fire an event
eventEmitter.emit("ram", "data from ram");





