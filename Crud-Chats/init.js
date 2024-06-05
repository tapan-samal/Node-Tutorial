const mongoose = require("mongoose");
const Chat = require("./models/chat");

const main = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
};

main()
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => console.log(err));

let allChats = [
  {
    from: "Neha",
    to: "Priya",
    msg: "Hi, How are you ?",
    created_at: new Date(),
  },
  {
    from: "Amit",
    to: "Raj",
    msg: "Hey, long time no see!",
    created_at: new Date(),
  },
  {
    from: "Sara",
    to: "Lily",
    msg: "Can we catch up over coffee tomorrow?",
    created_at: new Date(),
  },
  {
    from: "John",
    to: "Emma",
    msg: "Happy Birthday! Hope you have a great day!",
    created_at: new Date(),
  },
  {
    from: "Alex",
    to: "Chris",
    msg: "Are you coming to the party tonight?",
    created_at: new Date(),
  },
  {
    from: "Maya",
    to: "Sophie",
    msg: "Did you finish the project report?",
    created_at: new Date(),
  },
];
Chat.insertMany(allChats);
