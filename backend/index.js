const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { draw } = require("./scripts/canvas");

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", (req, res) => {
  try {
    fs.writeFileSync(path.join(__dirname, "output.txt"), "", (err) => {
      if (err) throw err;
    });
    draw(req.body.text);
    res.end("Output.txt is ready for download.");
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.get("/download", (req, res) => {
  const file = fs.readFileSync(path.join(__dirname, "output.txt"));
  res.send(Buffer.from(file));
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001...`);
});
