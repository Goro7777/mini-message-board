const db = require("../db/queries");
const { getTextShort } = require("../util");

async function getAllMessages(req, res) {
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
}

async function addMessageGet(req, res) {
    res.render("pages/form", {
        title: "New Message",
        message: null,
        action: "/new",
    });
}

async function addMessagePost(req, res) {
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
}

async function getMessage(req, res) {
    const id = req.params.id;
    const message = await db.getMessage(id);
    res.render("pages/message", { message, title: "Message" });
}

async function deleteMessage(req, res) {
    const id = req.params.id;
    await db.deleteMessage(id);
    res.redirect("/");
}

async function editMessageGet(req, res) {
    const id = req.params.id;
    const message = await db.getMessage(id);
    res.render("pages/form", {
        title: "Edit Message",
        message,
        action: "/edit/" + message.id,
    });
}

async function editMessagePost(req, res) {
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
}

module.exports = {
    getAllMessages,
    addMessageGet,
    addMessagePost,
    getMessage,
    deleteMessage,
    editMessageGet,
    editMessagePost,
};
