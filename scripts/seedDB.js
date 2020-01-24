const mongoose = require("mongoose");
const db = require("../models");


// This file empties the Books collection and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/bonappetit"
  );


const users= [
    {
        name: "Lavar Cole",
        username: "Lcole490",
        password:"",
        recipeId: [],
    
    }
];


db.users
  .remove({})
  .then(() => db.Book.collection.insertMany(bookSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });