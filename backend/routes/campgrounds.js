const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schems')
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../middleware')


const validataCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body)
  if (error) {
    const msg = error.details.map((element) => element.message).join(',')
    throw new ExpressError(msg, 400)
  }
  else {
    next()
  }
}


router.get("/", catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.json(campgrounds);
}));

router.get("/:id", catchAsync(async (req, res) => {
  const campground = await Campground
    .findById(req.params.id)
    .populate("reviews");

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

  await campground.save();

  res.status(201).json({
    success: true,
    message: "Campground created successfully",
    campground
  });
})
);

router.put('/:id/edit', isLoggedIn, validataCampground, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  if (!campground) {
    return res.status(404).json({
      success: false,
      message: "Campground not found"
    });
  }

  res.status(200).json({
    success: true,
    message: "Campground updated successfully",
    campground
  });
})
);

router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {

  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  if (!campground) {
    console.log("Campground not found");

    return res.status(404).json({
      success: false,
      message: "Campground not found"
    });
  }
  res.json({
    success: true,
    message: "Campground deleted successfully"
  });
}));

module.exports = router;