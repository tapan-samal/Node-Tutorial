const express = require("express");
const path = require("path");
const app = express();

const PORT = 4400;

//Serving static files
app.use(express.static(path.join(__dirname, "/public/css")));
app.use(express.static(path.join(__dirname, "/public/js")));

//ejs internally require by express
app.set("view engine", "ejs");

//Make path dynamic, can render from other directory
app.set("views", path.join(__dirname, "/views"));

//express by default search the views file
app.get("/", (req, res) => {
  res.render("home.ejs"); //.ejs optional
});

app.get("/rolldice", (req, res) => {
  let diceValue = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice.ejs", { diceValue });
});

//Iterate from an array
// app.get("/insta/:username", (req, res) => {
//   let followers = ["Steve", "Lilly", "Jhon", "Amenda"];
//   let { username } = req.params;
//   res.render("insta.ejs", { username, followers });
// });

//Iterate from an json file
app.get("/insta/:username", (req, res) => {
  const { username } = req.params;
  const instaData = require("./data.json");
  const data = instaData[username];
  console.log(data);
  if (data) {
    res.render("insta.ejs", { data });
  } else {
    res.render("error.ejs");
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
