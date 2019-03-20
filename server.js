var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine','ejs');
app.use(express.static('public'));

app.get('/', function(req, res){
  res.render('index');
});

io.on('connection', function(socket){
    console.log('a user connected');
    io.emit('message','a user connected');
    socket.on('message',function(msg){
        io.emit('message',msg);
    });

    socket.on('create', function (room) {
        socket.join(room);
    });
});

io.on('disconnected',function(){
    console.log('usr disconnected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});