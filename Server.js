var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = 8080;

// use this to serve static files like .js and .css
app.use(express.static('static'));

// serve the webpage
app.get('/', function(req, res){
  res.sendFile(__dirname + '/drawboard.html');
});

// socket io operations
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('chat message', function(msg){
  	console.log(msg);
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(PORT, function(){
  console.log('listening on %d', PORT);
});
