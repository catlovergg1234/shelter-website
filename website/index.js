const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

let links = {};

async function loadJSON() {
  const text = await fs.promises.readFile('data.json', 'utf8');
  return JSON.parse(text);
}

(async () => {
  if (fs.existsSync("data.json")) {
    links = await loadJSON();
  } else {
    links = {};
  }
})();

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

app.get("/addlink", (req, res) => {
  const slug = req.query.slug;
  const target = req.query.target;

  if (!slug || !target) {
    return res.json({ state: "error", message: "slug and target are required" });
  }

  links[slug] = target;

  fs.writeFile("data.json", JSON.stringify(links, null, 2), err => {
    if (err) throw err;
    res.json({ state: "success" });
  });
});

app.get("/images/robot.jpg", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "robot.jpg"));
});

app.get("/images/cat.png", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "4d4fd95b-9742-4d6b-bb83-0c81ac987642.png"));
});

app.use("/:slug", (req, res) => {
  const slug = req.params.slug;

  if (slug in links) {
    return res.redirect(links[slug]);
  }

  return res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.listen(process.env.PORT || 3000, "0.0.0.0");
