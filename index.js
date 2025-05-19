const path = require("node:path");
const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date(),
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date(),
    },
];

app.get("/", (req, res) => {
    res.render("pages/index", { messages });
});

app.get("/form", (req, res) => {
    res.render("pages/form");
});

app.post("/new", (req, res) => {
    let newMessage = {
        text: req.body.messageText,
        user: req.body.messageUser,
        added: new Date(),
    };
    messages.push(newMessage);
    res.redirect("/");
});

app.all("/{*any}", (req, res, next) => {
    res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to requests on port ${PORT}`);
});
