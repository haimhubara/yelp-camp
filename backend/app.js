const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const Campground = require('./models/campground');
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


app.get("/", (req, res) => {
  res.send("Hello from yelpcamp")
})

app.get("/campgrounds", async (req, res) => {
  try {
    const campgrounds = await Campground.find({});
    res.json(campgrounds);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/campgrounds/:id", async (req, res) => {
  try {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
      return res.status(404).json({ error: "Campground not found" });
    }
    res.json(campground);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post('/campgrounds/new', async (req, res) => {
  try {
    const campground = new Campground(req.body);
    await campground.save();
    res.status(201).json(campground);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
})


app.put('/campgrounds/:id/edit', async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.delete('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  if (!campground) return res.status(404).json({ error: "Not found" });
  res.json({ message: "Deleted successfully", campground });
});

app.listen(5000, () => {
  console.log("Server is runnig on port 5000")
})