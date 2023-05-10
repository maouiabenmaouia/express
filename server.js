const express = require("express");
const moment = require("moment");
const ejs = require('ejs');
const app = express();


app.set("view engine", "ejs");

// Set the public folder as static
app.use(express.static(__dirname + "/public/views"));

// Custom middleware to verify the time of the request
const timeMiddleware = (req, res, next) => {
  const now = moment();
  const dayOfWeek = now.day();
  const hour = now.hour();

  if (dayOfWeek > 0 && dayOfWeek < 6 && hour >= 9 && hour < 17) {
    // It's a weekday and within working hours
    next();
  } else {
    
    res.send("Sorry, the website is only available during working hours (Monday to Friday, from 9 to 17).");
  }
};

// Routes
app.get("/", timeMiddleware, (req, res) => {
  res.render("home");
});

app.get("/services", timeMiddleware, (req, res) => {
  res.render("services");
});

app.get("/contact", timeMiddleware, (req, res) => {
  res.render("contact");
});

// Start the server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
