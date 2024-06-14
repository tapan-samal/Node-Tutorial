const express = require("express");
const app = express();
const PORT = 6060;
const ExpressError = require("./ExpressError");

//First middleware
app.use((req, res, next) => {
  console.log("I am first middleware!");
  next();
});

//Second middleware
app.use((req, res, next) => {
  console.log("I am second middleware!");
  return next();
});

//Access token (authentication)
const checkToken = (req, res, next) => {
  const { token } = req.query; // http://localhost:6060/api?token=giveaccess123
  if (token === "giveaccess123") {
    next();
  }
  throw new ExpressError(401, "ACCESS DENIED!");
};

app.get("/api", checkToken, (req, res) => {
  res.send("Data Accessed!");
});

//Utility middleware
app.use((req, res, next) => {
  req.time = new Date(Date.now());
  // console.log("Check method:", req.method);
  // console.log("Check hostname:", req.hostname);
  // console.log("Check path:", req.path);
  // console.log("Check time:", req.time);
  next();
});

//Route route
app.get("/", (req, res) => {
  res.send("Route Page!");
});

//Random route
app.get("/random", (req, res) => {
  res.send("Random Page!");
});

//Error handling
app.get("/err", (req, res) => {
  abcd === abcd;
});
//It will return default error

//Create Custom error
app.use((err, req, res, next) => {
  console.log("---First Error---");
  next(err);
});

// app.use((err, req, res, next) => {
//   console.log("---Second Error---");
//   res.send(err);
// });

app.use((err, req, res, next) => {
  let { status = 500, message= "Error Occurred" } = err;   //we can also assign default value
  res.status(status).send(message);
});

//Forbidden error
app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access is fobidden!")
})

// Invalid path
app.use((req, res) => {
  res.status(404).send("Page not found!");
});

//Server Connection
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

// Middleware functions are functions that have access to the request object (req), the response object (res), and
// the next middleware function in the application’s request-response cycle.
// The next middleware function is commonly denoted by a variable named next.

///Middleware Fnctions can perform:
//Execute any code.
//Make changes to the request and response objects.
//End the request response cycle.
//Call the next middleware function in the stack.

///Types of middleware
//Application-level middleware
// Router-level middleware
// Error-handling middleware
// Built-in middleware: express.static, express.json, express.urlencoded
// Third-party middleware: Helmet, Cookie-parser, Passport, Morgan, CORS
// https://blog.bitsrc.io/5-express-middleware-libraries-every-developer-should-know-94e2728f7503
