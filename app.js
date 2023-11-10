const express = require("express");
const { createServer } = require('node:http');
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 8000;
const messageController = require('./controllers/messageController')
require("dotenv").config();
const Messages = require('./helper/constant')

app.use(express.urlencoded({ extended: true }));

//Setup Cross Origin
app.use(require("cors")());
// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Bring in the models
require("./models/User");
require("./models/Chatroom");
require("./models/Message");

const jwt = require("jwt-then");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing to different modules
app.use("/user", require("./routes/user"));
app.use("/chatroom", require("./routes/chatroom"));
app.use('/message', require('./routes/message'))

const server = createServer(app);
app.use(express.static("public"));

const io = require('socket.io')(server,  
  {
    cors: {
      origin: '*',
    }
  });


// Authentication of socket request using global middleware
io.use(async (socket, next) => {
  const token = socket.handshake.query.token
  try{
    const payload = await jwt.verify(token, process.env.SECRET);
    socket.userId = payload.id
    return next()
  }catch(error){
    return next(new Error(Messages.AUTHENTICATION_ERROR));
  }
});
 
  io.on("connection", (socket) => {
  console.log("Connected: ");

  // pass chatroomId created in postman
  const chatroomId = '65488a1e3e1f4705a874f275'
  
  socket.on("message", async (message) => {
    io.emit('message', message);
    // save the message in DB along with user id and chatroom id
    await messageController.createMessage(chatroomId, socket.userId, message)

  });

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });
});


server.listen(port, () => {
  console.log(`Socket app is running on port ${port}`);
});


module.exports = app;
