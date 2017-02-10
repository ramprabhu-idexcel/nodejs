var myCallback = function(data) {
    console.log('got data: '+data);
};
var fn = function(callback) {
    callback('Data from Callback');
};
fn(myCallback);
