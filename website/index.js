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

app.listen(3000);