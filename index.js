const path = require("node:path");
const express = require("express");
require("dotenv").config();
const db = require("./db/queries");
const { getTextShort } = require("./util");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// TODO

// clean up routes
// Update form field names
// Add a router

app.get("/", async (req, res) => {
    const messages = await db.getAllMessages();
    const messagesFormatted = messages.map((message) => ({
        ...message,
        text: getTextShort(message.text),
        added: new Date(message.added),
    }));
    res.render("pages/index", { messages: messagesFormatted });
});

app.get("/messages/:id", async (req, res) => {
    const id = req.params.id;
    const message = await db.getMessage(id);
    res.render("pages/message", { message });
});

// delete
app.get("/messages/delete/:id", async (req, res) => {
    const id = req.params.id;
    await db.deleteMessage(id);
    res.redirect("/");
});

// edit
app.get("/messages/edit/:id", async (req, res) => {
    const id = req.params.id;
    const message = await db.getMessage(id);
    res.render("pages/form", {
        title: "Edit Message",
        message,
        action: "/messages/edit/" + message.id,
    });
});

app.post("/messages/edit/:id", async (req, res) => {
    let text = req.body.messageText.trim();
    let username = req.body.messageUser.trim();
    let id = req.params.id;
    if (text && username) {
        db.editMessage({
            id,
            username,
            text,
            added: new Date(),
        });
    }
    res.redirect(`/messages/${id}`);
});

// add
app.get("/new", (req, res) => {
    res.render("pages/form", {
        title: "New Message",
        message: null,
        action: "/new",
    });
});

app.post("/new", async (req, res) => {
    let text = req.body.messageText.trim();
    let username = req.body.messageUser.trim();
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

app.all("/{*any}", (req, res, next) => {
    res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to requests on port ${PORT}`);
});
