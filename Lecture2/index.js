const express = require("express");
const app = express();

// console.dir(app);
let PORT = 4000;

//Create server//
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

// Handling request//
app.use((req, res) => {
  console.log("Request received!");

  // Sending response//
  //Sending String
  res.send("Response sent!");

  //Sending Object
  res.send({
    name: "Node",
    role: "Developer",
  });
  //Sending HTML
  let code = "<h1>JavaScript</h1> <ul><li>React</li><li>Express</li></ul>";
  res.send(code);
});

//Routing//
app.get("/", (req, res) => {
  res.send("This is root path");
});

app.get("/search", (req, res) => {
  res.send("Search Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

app.get("*", (req, res) => {
  res.send("Invalid page");
});

//Path parameters//
app.get("/:username/:id", (req, res) => {
  console.log(req.params);
  let { username, id } = req.params;
  // res.send(`Welcome to @${username}`)
  let htmlStr = `<h1>Welcome to @${username}</h1>`;
  res.send(htmlStr);
});

//Query strings//
//Path: http://localhost:4000/search?q=tapan
app.get("/search", (req, res) => {
  const { q } = req.query;
  // res.send(`Search results for query: ${q}`)
  if (!q) {
    res.send(`<h1>Nothing search!</h1>`);
  }
  res.send(`<h1>Search results for query: ${q}</h1>`);
});
