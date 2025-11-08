const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const Campground = require('./models/campground');
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const campgroundSchema = require('./schems')
const app = express()
app.use(express.json());

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

const validataCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body)
  if (error) {
    const msg = error.details.map((element) => element.message).join(',')
    throw new ExpressError(msg, 400)
  }
  else{
    next()
  }
}


app.get("/", (req, res) => {
  res.send("Hello from yelpcamp")
})

app.get("/campgrounds", catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.json(campgrounds);
}));

app.get("/campgrounds/:id", catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  if (!campground) {
    return res.status(404).json({ error: "Campground not found" });
  }
  res.json(campground);
}));

app.post('/campgrounds/new', validataCampground, catchAsync(async (req, res, next) => {
  validataCampground(campground)
  const campground = new Campground(req.body);
  await campground.save();
  res.status(201).json(campground);
}))


app.put('/campgrounds/:id/edit', validataCampground, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  if (!campground) {
    return res.status(404).json({ error: "Campground not found" });
  }

  res.json(campground);
}));

app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  if (!campground) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Deleted successfully", campground });
}));

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