const express = require("express");
const app = express();

const PORT = 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/register", (req, res) => {
    const {user, password} = req.query;
  res.send(`Data GET successfully, Welcome @${user}`);
});

app.post("/register", (req, res) => {
    console.log(req.body);
    const {user, password} = req.body;
  res.send(`Data POST successfully, Welcome ${user}!`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
