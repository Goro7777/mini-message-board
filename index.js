const path = require("node:path");
const express = require("express");
require("dotenv").config();
const messagesRouter = require("./routes/messagesRouter");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", messagesRouter);

// catch-all middleware for handling errors
app.use((err, req, res, next) => {
    console.error(err);
    res.redirect("/");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening to requests on port ${PORT}`);
});
