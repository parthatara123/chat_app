const Message = require('../models/Message')
const User = require('../models/User')
const Chatroom = require('../models/Chatroom')
const { Messages } = require('../helper/constant')


exports.createMessage = async (chatroomId, userId, message) => {
        try {         
           // Check if the chatroom exists
           const chatroomExists = await Chatroom.findById(chatroomId);

          //TODO: we can add more validations like bellow
          //  if (!chatroomExists ) {
          //    return res.status(400).send({ 
          //     status: 400,
          //     error: "Invalid chatroom" 
          //   });
          //  }

          // Check if the chatroom exists
          const user = await User.findOne({ _id: userId });
          const newMessage = new Message({
            chatroom: chatroomId,
            user: userId,
            message,
          });
          
          const newMsg = await newMessage.save();
          return newMsg
            
        } catch (error) {
          // handle socket error
      }
    }

exports.getMessages = async (req, res) => {
        try {
          const { chatroomId } = req.query;
      
          // Check if the chatroom and user exist
          const chatroomExists = await Chatroom.findById(chatroomId);
          // const userExists = await User.findById(userId);
      
          if (!chatroomExists) {
            return res.status(400).json({ error: Messages.INVALID_CHATROOM });
          }
      
          const getMessages = await Message.find({chatroom:chatroomId })
          .populate('user', 'firstName')
          .select({'message' : 1, _id:0});
          
          res.status(200).send({
            status: 200,
            message: "success!",
            data: getMessages
        });
        } catch (error) {
          res.status(500).send({ 
            status: 500,
            error: error.message 
          });
        }
};

exports.getAllChatRooms = async (req, res) => {
  try{
    const chatRooms = await Chatroom.find({});

    res.status(200).send({
      status: 200,
      message: "success!",
      data: chatRooms
      });
  }catch(error){
    res.status(500).send({ 
      status: 500,
      error: error.message 
    });
  }
 
};
