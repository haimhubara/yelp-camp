const express = require('express')
const router = express.Router({ mergeParams: true });
const Campground = require('../models/campground');
const Review = require('../models/review')
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('../middleware')




router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {

    const campground = await Campground.findById(req.params.id);

    if (!campground) {
        return res.status(404).json({
            success: false,
            message: "Campground not found"
        });
    }

    const review = new Review(req.body.review);
    review.author = req.user._id;


    campground.reviews.push(review);

    await review.save();
    await campground.save();

    res.status(201).json({
        success: true,
        message: "Review added successfully",
        review
    });
}));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {

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