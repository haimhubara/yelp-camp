const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const { storage } = require("../claoudinary")
const multer = require('multer')
const upload = multer({ storage })




router.get("/", catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({}).populate("author");
  res.json(campgrounds);
}));

router.get("/:id", catchAsync(async (req, res) => {
  const campground = await Campground
    .findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("author");

  if (!campground) {
    return res.status(404).json({
      success: false,
      message: "Campground not found"
    });
  }

  res.json(campground);
}));

router.post('/new', isLoggedIn, upload.array('image'), validateCampground, catchAsync(async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.images =  req.files.map(f => ({url:f.path,filename:f.filename}));
  campground.author = req.user;

  await campground.save();
  console.log(campground)

  res.status(201).json({
    success: true,
    message: "Campground created successfully",
    campground
  });
})
);

router.put('/:id/edit', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {

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