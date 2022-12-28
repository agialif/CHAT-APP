var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dotenv = require('dotenv')
var cors = require("cors")
var socket = require("socket.io")
var mongoose = require("mongoose")
var userRouter = require("./routes/users")
var messageRouter = require("./routes/message")
const supplierRouter = require('./routes/supplier');
var indexRouter = require('./routes/index');

var app = express();
dotenv.config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//Swagger
const swaggerUi = require('swagger-ui-express')
const apiDocumentation = require('./apidoc.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

//ROUTE
app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/message', messageRouter);
app.use('/supplier', supplierRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
mongoose.set('strictQuery', true);
var connect = mongoose.connect(process.env.DB_URL,{

})
connect.then(
  (db) => {
    console.log("Connection to Database Successfull")
  },
  (err) => {
    console.log("Connection to Database Unsuccessfull: ", err)
  }
)
const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 1000,
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
   console.log(`User Connected: ${socket.id}`);
   socket.on("online-user", (userId) => {
   //const Id = JSON.stringify(userId).split(":").join(",").split('"')  
   onlineUsers.set(userId, socket.id)
   console.log(onlineUsers)
 })

 socket.on("msg-send", (data)=> {
   const toUserSocket = onlineUsers.get(data.to);
   console.log("Message Sent")
   console.log(data)
   if (toUserSocket) {
    socket.to(toUserSocket).emit("rcv-msg", data.message)
    console.log("Message Received")
    console.log(data)
  }
 })
})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});

module.exports = app;
