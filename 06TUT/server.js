const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

app.get(/^\/(?:index(?:\.html)?)?$/, (req, res) => {
    // res.sendFile("./views/index.html", { root: __dirname });
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get(/^\/new-page(?:\.html)?\/?$/, (req, res) => {
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get(/^\/old-page(?:\.html)?\/?$/, (req, res) => {
    res.redirect(301, "/new-page.html");
});

// Route handlers
app.get(
    /^\/hello(?:\.html)?\/?$/,
    (req, res, next) => {
        console.log("attempted");
        next();
    },
    (req, res) => {
        res.send("hello world!");
    }
);

app.get(/^\/.*$/, (req, res) => {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
