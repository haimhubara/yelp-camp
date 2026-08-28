const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session')
const ExpressError = require('./utils/ExpressError');

const app = express()
app.use(express.json());

const sessionConfig = {
  secret: "thisshouldberealsecret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
};


app.use(session(sessionConfig));


const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");

app.use(cors({
  origin: 'http://localhost:3000'
}));

mongoose.connect('mongodb://localhost:27017/yelp-camp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo connection error:', err));



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'))
db.once("open", () => {
  console.log("Database connected")
})





app.use("/campgrounds", campgrounds);
app.use("/campgrounds/:id/review", reviews);

app.get("/", (req, res) => {
  res.send("Hello from yelpcamp")
})





app.all(/(.*)/, (req, res, next) => {
  next(new ExpressError('page not faound', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).json({ error: message });
})

app.listen(5000, () => {
  console.log("Server is runnig on port 5000")
})