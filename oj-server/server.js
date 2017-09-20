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

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


