const path = require("node:path");
const express = require("express");
require("dotenv").config();
const db = require("./db/queries");
const { getTextShort, uuid } = require("./util");
const { text } = require("node:stream/consumers");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const messages = [
    {
        id: uuid(),
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
    },
    {
        id: uuid(),
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        user: "Charles",
        added: new Date(),
    },
];

app.get("/", async (req, res) => {
    const messages = await db.getMessages();
    const messagesFormatted = messages.map((message) => ({
        ...message,
        text: getTextShort(message.text),
        added: new Date(message.added),
    }));
    res.render("pages/index", { messages: messagesFormatted });
});

app.get("/messages/:id", (req, res) => {
    const id = req.params.id;
    let message = messages.find((m) => m.id === id);
    res.render("pages/message", { message });
});

app.get("/form", (req, res) => {
    res.render("pages/form");
});

app.post("/new", (req, res) => {
    let text = req.body.messageText;
    if (text.trim()) {
        let newMessage = {
            id: uuid(),
            text,
            user: req.body.messageUser,
            added: new Date(),
        };
        messages.push(newMessage);
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
