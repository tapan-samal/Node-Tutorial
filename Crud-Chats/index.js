const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");

const app = express();
const PORT = 8070;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Database Connection
const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

main()
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => console.log(err));

//Index Route
app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  //   console.log(chats);
  res.render("index.ejs", { chats });
});

//New chat
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//Submit route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => console.log("Chat created"))
    .catch((err) => console.log(err));
  console.log(newChat);
  res.redirect("/chats");
});

//Edit route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params;
  let chat = await Chat.findById(id);
  res.render("edit.ejs", { chat });
});

//Updated route
app.put("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidator: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});

//Delete route
app.delete("/chats/:id", async (req, res) => {
  let { id } = req.params;
  let deletedChat = await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
});

//Root route
app.get("/", (req, res) => {
  res.send("App is working!");
});

//Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
