const express = require('express');
const app = express();
 
var restRouter = require('./routes/rest.js');
var indexRouter = require('./routes/index.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://user:user@ds033259.mlab.com:33259/cs503');
var path =require('path');


app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/v1', restRouter);
app.use('/', indexRouter);

app.use('/api/v1', restRouter);

app.use(function(req, res){
	res.sendFile('index.html', {root: path.join(__dirname, '../public') })
})

/*
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

var http =require('http');
var socketIO =require('socket.io');
var io = socketIO();

var editorSocketService = require('./services/editorSocketService')(io);

//create http server
var server = http.createServer(app);
io.attach(server);
server.listen('3000');
server.on('error', onError);
server.on('listening', onListening);

function onError(error){
	throw error;
}

function onListening(){
	var addr = server.address();
	var bind = typeof addr === 'string'
	? 'pipe' + addr
	: 'port' + addr.port;
	console.log('listening on' + bind);
}



