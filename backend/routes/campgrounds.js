const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground, validateCampgroundEdit } = require('../middleware')
const { storage } = require("../claoudinary")
const multer = require('multer');
const campground = require('../models/campground');
const { cloudinary } = require("../claoudinary")
const upload = multer({ storage })
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;




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
  const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
  if (!geoData.features?.length) {
    return res.status(404).json({
      success: false,
      message: "Could not geocode that location. Please try again and enter a valid location."
    });
  }

  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.features[0].geometry;
  campground.location = geoData.features[0].place_name;
  campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
  campground.author = req.user;

  await campground.save();

  res.status(201).json({
    success: true,
    message: "Campground created successfully",
    campground
  });
})
);

router.put('/:id/edit', isLoggedIn, isAuthor, upload.array('image'), validateCampgroundEdit, catchAsync(async (req, res) => {

  const { id } = req.params;

  const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
  if (!geoData.features?.length) {
    return res.status(404).json({
      success: false,
      message: 'Could not geocode that location. Please try again and enter a valid location.'
    });

  }

  const camp = await Campground.findById(id);

  if (!camp) {
    return res.status(404).json({
      success: false,
      message: "Campground not found"
    });
  }

  // Update regular fields
  camp.title = req.body.campground.title;
  camp.price = req.body.campground.price;
  camp.description = req.body.campground.description;


  camp.geometry = geoData.features[0].geometry;
  camp.location = geoData.features[0].place_name;

  // Add new images
  if (req.files && req.files.length > 0) {
    camp.images.push(
      ...req.files.map(file => ({
        url: file.path,
        filename: file.filename
      }))
    );
  }

  if (req.body.deleteImages) {
    const deleteImages = Array.isArray(req.body.deleteImages)
      ? req.body.deleteImages
      : [req.body.deleteImages];

    for (let filename of deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }

    await camp.updateOne({
      $pull: {
        images: {
          filename: { $in: deleteImages }
        }
      }
    });
  }
  await camp.save();

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