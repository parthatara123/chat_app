const router = require("express").Router();
const messageController = require("../controllers/messageController");

const auth = require("../middlewares/auth");

router.post("/", auth, messageController.createMessage);
router.get("/", auth, messageController.getMessages);


module.exports = router;