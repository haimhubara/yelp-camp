const Campground = require("./models/campground");
const Review = require("./models/review");
const { campgroundSchema, reviewSchema } = require("./schems");
const ExpressError = require("./utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({
            success: false,
            message: "You must be logged in"
        });
    }

    next();
};

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;

    const campground = await Campground.findById(id);

    if (!campground) {
        return res.status(404).json({
            success: false,
            message: "Campground not found"
        });
    }

    if (!campground.author.equals(req.user._id)) {
        return res.status(403).json({
            success: false,
            message: "You don't have permission!"
        });
    }

    next();
};

module.exports.validateCampground = (req, res, next) => {
    // Validate campground fields
    const { error } = campgroundSchema.validate(req.body.campground);

    if (error) {
        const msg = error.details
            .map(element => element.message)
            .join(',');

        throw new ExpressError(msg, 400);
    }

    // Validate images
    if (!req.files || req.files.length === 0) {
        throw new ExpressError("At least one image is required", 400);
    }

    next();
};
module.exports.validateCampgroundEdit = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body.campground);

    if (error) {
        const msg = error.details
            .map(element => element.message)
            .join(',');

        throw new ExpressError(msg, 400);
    }

    next();
};

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map((element) => element.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next()
    }
}


module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) {
        return res.status(404).json({
            success: false,
            message: "Review not found"
        });
    }

    if (!review.author.equals(req.user._id)) {
        return res.status(403).json({
            success: false,
            message: "You don't have permission!"
        });
    }

    next();
};
