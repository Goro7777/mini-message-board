const express = require("express");
const messagesRouter = express.Router();
const { getTextShort } = require("../util");
const db = require("../db/queries");

// const {
//     getUsernames,
//     createUsernameGet,
//     createUsernamePost,
//     deleteUsernamesGet,
// } = require("../controllers/userController");

// usersRouter.get("/", getUsernames);
// usersRouter.get("/new", createUsernameGet);
// usersRouter.post("/new", createUsernamePost);
// usersRouter.get("/delete", deleteUsernamesGet);

// show all messages
messagesRouter.get("/", async (req, res) => {
    const messages = await db.getAllMessages();
    const messagesFormatted = messages.map((message) => ({
        ...message,
        text: getTextShort(message.text),
        added: new Date(message.added),
    }));
    res.render("pages/index", {
        messages: messagesFormatted,
        title: "Message Board",
    });
});

// add a new message
messagesRouter.get("/new", (req, res) => {
    res.render("pages/form", {
        title: "New Message",
        message: null,
        action: "/new",
    });
});

messagesRouter.post("/new", async (req, res) => {
    let text = req.body.text.trim();
    let username = req.body.username.trim();
    if (text && username) {
        let newMessage = {
            username,
            text,
            added: new Date(),
        };
        await db.addMessage(newMessage);
    }
    res.redirect("/");
});

// show a message
messagesRouter.get("/:id", async (req, res) => {
    const id = req.params.id;
    const message = await db.getMessage(id);
    res.render("pages/message", { message, title: "Message" });
});

// delete a message
messagesRouter.get("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await db.deleteMessage(id);
    res.redirect("/");
});

// edit a message
messagesRouter.get("/edit/:id", async (req, res) => {
    const id = req.params.id;
    const message = await db.getMessage(id);
    res.render("pages/form", {
        title: "Edit Message",
        message,
        action: "/edit/" + message.id,
    });
});

messagesRouter.post("/edit/:id", async (req, res) => {
    let text = req.body.text.trim();
    let username = req.body.username.trim();
    let id = req.params.id;
    if (text && username) {
        db.editMessage({
            id,
            username,
            text,
            added: new Date(),
        });
    }
    res.redirect(`/${id}`);
});

module.exports = messagesRouter;
