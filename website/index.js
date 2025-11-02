const express = require('express');
const path = require('path');
const app = express();

console.log(__dirname);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "about.html"));
});

app.get("/donate", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "donate.html"));
});

app.get("/thank-you", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "thankyou.html"));
});

app.get("/images/robot.jpg", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "robot.jpg"))
});

app.get("/images/cat.png", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "robot.jpg"))
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(process.env.PORT || 3000, "0.0.0.0");




