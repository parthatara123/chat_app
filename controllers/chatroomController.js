const mongoose = require("mongoose");
const Chatroom = mongoose.model("Chatroom");

exports.createChatroom = async (req, res) => {
  const { name } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)){
    return res.status(400).send({
      status: 400,
      message: Messages.INVALID_CHATROOM_NAME
    });
  } ;

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) {
    return res.status(400).send({
      status: 400,
      message: Messages.CHATROOM_ALREADY_EXISTS
    });
  } ;

  const chatroom = new Chatroom({
    name,
  });

  await chatroom.save();

  res.status(201).send({
    status: 201,
    message: Messages.CHATROOM_CREATED,
    data: {}
  });
};

exports.getAllChatRooms = async (req, res) => {
  const chatRooms = await Chatroom.find({});

  res.status(200).send({
    status: 200,
    message:'success',
    data: chatRooms
  });
};
