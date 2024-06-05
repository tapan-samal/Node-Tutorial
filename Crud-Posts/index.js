const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    id: uuidv4(),
    username: "Commerce Coder",
    content: "I love coding!",
  },
  {
    id: uuidv4(),
    username: "Tapan Samal",
    content: "Learning code to become a developer!",
  },
  {
    id: uuidv4(),
    username: "R Mohanty",
    content: "Struggling to get job!",
  },
];

//Routing to all posts
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//Routing create new post
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

//Create new post
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

//Show detail by ID
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

//Routing for update
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

//Update by ID
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let updatedContent = req.body.content;
  let post = posts.find((p) => p.id === id);
  post.content = updatedContent;
  res.redirect("/posts");
});

//Delete by ID
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

//Server Listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
