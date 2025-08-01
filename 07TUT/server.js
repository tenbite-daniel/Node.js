const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger, logEvents } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// custom middleware logger

app.use(logger);

const whitelist = [
    "https://www.google.com",
    "http://127.0.0.1:5500",
    "http://localhost:3500",
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("not allowed by cors"));
        }
    },
    optionsSuccesssStatus: 200,
};

app.use(cors(corsOptions));

// built-in middleware app.use
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));

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

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ error: "404 not found" });
    } else {
        res.type("txt").send("404 not found");
    }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
