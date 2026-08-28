const express = require('express')
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/review')
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../schems')

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((element) => element.message).join(',')
    throw new ExpressError(msg, 400)
  }
  else {
    next()
  }
}

router.post('/', validateReview, catchAsync(async (req, res) => {

    const campground = await Campground.findById(req.params.id);

    if (!campground) {
        return res.status(404).json({
            success: false,
            message: "Campground not found"
        });
    }

    const review = new Review(req.body.review);

    campground.reviews.push(review);

    await review.save();
    await campground.save();

    res.status(201).json({
        success: true,
        message: "Review added successfully",
        review
    });
}));

router.delete('/:reviewId', catchAsync(async (req, res) => {

    const { id, reviewId } = req.params;

    const campground = await Campground.findByIdAndUpdate(
        id,
        { $pull: { reviews: reviewId } },
        { new: true }
    );

    if (!campground) {
        return res.status(404).json({
            success: false,
            message: "Campground not found"
        });
    }

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
        return res.status(404).json({
            success: false,
            message: "Review not found"
        });
    }

    res.status(200).json({
        success: true,
        message: "Review deleted successfully"
    });
}));

module.exports = router;