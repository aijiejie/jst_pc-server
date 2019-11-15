const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const fs = require('fs');

const indexRouter = require('./routes/index');
const managerAPIRouter = require('./routes/managerApi');
const mobileAPIRouter = require('./routes/mobileApi');

const app = express();

// 解决跨域
// 跨域中间件处理
let crossDomain = (req, resp, next) => {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Methods", 'PUT, POST, GET, DELETE, OPTIONS');
  resp.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With");
  next();

};
app.use(crossDomain);

// 自定义日志格式，添加请求参数和请求体
logger.token('requestParameters', function (req, res) {
  return JSON.stringify(req.query) || '-';
});
logger.token('requestBody', function (req, res) {
  return JSON.stringify(req.body) || '-';
});
logger.format('live-api', ':remote-addr [:date[clf]] :method :url :status :requestParameters :requestBody');
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});
// setup the logger
app.use(logger('live-api', {stream: accessLogStream}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', managerAPIRouter);
app.use('/mobile/api', mobileAPIRouter);

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
  res.render('error');
});

module.exports = app;
