if (process.env.NODE_ENV !== "production") {
  require("dotenv",).config({ quiet: true })
}
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session')
const MongoDBStore = require('connect-mongo').default;
const ExpressError = require('./utils/ExpressError');
const User = require('./models/user')
const passport = require('passport');
const localStrategy = require('passport-local');
const sanitizeV5 = require('./utils/mongoSanitizeV5.js');
const helmet = require('helmet');
const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/yelp-camp';

const app = express()
app.use(helmet());
app.set('query parser', 'extended');
app.use(express.json());
app.use(sanitizeV5({ replaceWith: '_' }));

const secret = process.env.SECRET || "thisshouldberealsecret"

const store = MongoDBStore.create({
  mongoUrl: dbUrl,
  secret,
  touchAfter: 24 * 60 * 60
})

store.on("error", (e) => {
  console.log("SESSION STORE ERROR ", e)
})


const allowedOrigins = [
  'http://localhost:3000',
  'https://yelp-camp-frontend.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

const sessionConfig = {
  store,
  name: "session",
  secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  }
};


app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const users = require("./routes/users");
const campgrounds = require("./routes/campgrounds");
const reviews = require("./routes/reviews");



mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo connection error:', err));



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'))
db.once("open", () => {
  console.log("Database connected")
})




app.use("/", users);
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

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});