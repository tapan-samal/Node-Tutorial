const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override");
const ExpressError = require("./ExpressError");

const app = express();
const PORT = 8070;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//Database Connection
const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/fakewhatsapp");
};

main()
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => console.log(err));

//Error handling function(instaed of try and catch)
function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

//Index Route
app.get(
  "/chats",
  asyncWrap(async (req, res) => {
    let chats = await Chat.find();
    //   console.log(chats);
    res.render("index.ejs", { chats });
  })
);

//New route
app.get("/chats/new", (req, res) => {
  // throw new ExpressError(404, "Page not found");
  res.render("new.ejs");
});

//Submit route
app.post(
  "/chats",
  asyncWrap(async (req, res, next) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
      from: from,
      to: to,
      msg: msg,
      created_at: new Date(),
    });
    await newChat
      .save()
      .then((res) => console.log("Chat created"))
      .catch((err) => console.log(err));
    console.log(newChat);
    res.redirect("/chats");
  })
);

//New - Show route
app.get(
  "/chats/:id",
  asyncWrap(async (req, res, next) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    if (!chat) {
      next(new ExpressError(404, "Chat not found!"));
    }
    res.render("edit.ejs", { chat });
  })
);

//Edit route
app.get(
  "/chats/:id/edit",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
  })
);

//Updated route
app.put(
  "/chats/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
      id,
      { msg: newMsg },
      { runValidator: true, new: true }
    );
    console.log(updatedChat);
    res.redirect("/chats");
  })
);

//Delete route
app.delete(
  "/chats/:id",
  asyncWrap(async (req, res) => {
    let { id } = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
  })
);

//Root route
app.get("/", (req, res) => {
  res.send("App is working!");
});

//Printing error name
app.use((err, req, res, next) => {
  // console.log(err.name);
  if(err.name === "ValidatorError") {
    console.log("Validation error, please follow the rules!");
  }
  next(err);
});

//Error handling middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "Error Occurred" } = err;
  res.status(status).send(message);
});

//Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
