var express = require('express'),
    app = express.createServer()
  , io = require('socket.io').listen(app);

app.use('/assets', express.static(__dirname + '/assets'));

app.listen(80);

  io.enable('browser client minification');  // send minified client
  io.enable('browser client etag');          // apply etag caching logic based on version number
  io.enable('browser client gzip');          // gzip the file
  io.set('log level', 0);                    // reduce logging

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/gamepad/', function (req, res) {
  res.sendfile(__dirname + '/gamepad/index.html');
});

io.sockets.on('connection', function (socket) {

  socket.on('gamepad', function (data) {
    //console.log(data) 
    socket.broadcast.emit('gamepad', data); //JSON.parse(data));
  });

  socket.on('connect', function () {
    socket.broadcast.emit('user connected');
  });

  socket.on('disconnect', function () { 
    socket.broadcast.emit('user disconnected');
  });

});