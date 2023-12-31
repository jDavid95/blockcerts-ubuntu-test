/*const http = require("http")
var fs = require('fs');
var index = fs.readFileSync('index.html');
  

const server = http.createServer((req, res) => { 
    //res.write("This is the response from the server") 
    res.end(index); 
}) 
  
// Server listening to port 3000 
server.listen((3000), () => {
    
    console.log("Server is Running"); 
    })*/
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 
var indexRouter = require('./routes/index');
 
var app = express();
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');
 
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/blockcerts-verifier', express.static(__dirname + '/node_modules/@blockcerts/blockcerts-verifier/dist/')); 
app.use('/webcomponentsjs', express.static(__dirname + '/node_modules/@webcomponents/webcomponentsjs/'));

 
app.use('/', indexRouter);
 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.type('html');
  res.render('error');
});
 
module.exports = app;
