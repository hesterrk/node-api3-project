const express = require("express");

const server = express();
const helmet = require("helmet");
const userRouter = require("./users/userRouter");

server.use(logger);
server.use(helmet());
server.use(express.json());

//User Route
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//1. Logger Custom middleware: global, av. with all endpoints

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request to ${req.originalUrl} `
  );
  next();
}

//Custom Middleware: custom error message for bad requests
server.use((req, res) => {
  res.status(404).json({
    message: "Route not found"
  });
});

//Custom Middleware: get rid of 500 catch statements --> error middleware
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong"
  });
});

module.exports = server;
