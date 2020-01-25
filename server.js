const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
app.use(express.json());
var db = require("./models");
mongoose.connect("mongodb://localhost/populatedb", { useNewUrlParser: true });
//const users = [];
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  // console.log(users);
  next();
});

app.get("/users", (req, res) => {
  console.log("our .rest works!");
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const salt = bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(salt);
    console.log(hashedPassword);
    const user = {
      name: req.body.name,
      password: hashedPassword,
      username: req.body.username
    };
    console.log(user);
    db.User.create(user).then(success => console.log(success)); //users.push(user);
    res.status(201).send();
  } catch {
    res.status(500).send();
  }
});
app.post("/users/login", async (req, res) => {
  db.User.find({ username: req.body.username }).then(async user => {
    console.log(user);

    if (user == null) {
      return res.status(400).send("Cannot find User");
    } else {
      try {
        if (await bcrypt.compare(req.body.password, user.password)) {
          res.send("Success");
        } else {
          res.send("Access Denied");
        }
      } catch {
        res.status(500).send("why won't it work");
      }
    }
  });
});

app.listen(3000);
