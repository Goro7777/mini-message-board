const express = require("express");
const messagesRouter = express.Router();
const messagesController = require("../controllers/messagesController");

messagesRouter.get("/", messagesController.getAllMessages);
messagesRouter.get("/new", messagesController.addMessageGet);
messagesRouter.post("/new", messagesController.addMessagePost);
messagesRouter.get("/:id", messagesController.getMessage);
messagesRouter.get("/delete/:id", messagesController.deleteMessage);
messagesRouter.get("/edit/:id", messagesController.editMessageGet);
messagesRouter.post("/edit/:id", messagesController.editMessagePost);

module.exports = messagesRouter;
