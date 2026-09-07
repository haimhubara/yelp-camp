const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validataCampground } = require('../middleware')




router.get("/", catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({}).populate("author");
  res.json(campgrounds);
}));

router.get("/:id", catchAsync(async (req, res) => {
  const campground = await Campground
    .findById(req.params.id)
    .populate({path:"reviews",populate:{path:"author"}})
    .populate("author");

  if (!campground) {
    return res.status(404).json({
      success: false,
      message: "Campground not found"
    });
  }

  res.json(campground);
}));

router.post('/new', isLoggedIn, validataCampground, catchAsync(async (req, res) => {
  const campground = new Campground(req.body);
  campground.author = req.user;

  await campground.save();

  res.status(201).json({
    success: true,
    message: "Campground created successfully",
    campground
  });
})
);

router.put('/:id/edit', isLoggedIn, isAuthor, validataCampground, catchAsync(async (req, res) => {

  const { id } = req.params;

  const camp = await Campground.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  res.status(200).json({
    success: true,
    message: "Campground updated successfully",
    campground: camp
  });
})
);

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {

  const { id } = req.params;

  await Campground.findByIdAndDelete(id);

  res.json({
    success: true,
    message: "Campground deleted successfully"
  });
})
);

module.exports = router;