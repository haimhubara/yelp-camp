const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');




router.post('/register', catchAsync(async (req, res, next) => {

    const { username, password, email } = req.body;

    const user = new User({ email, username });

    const registerUser = await User.register(user, password);

    req.login(registerUser, err => {

        if (err) {
            return next(err);
        }

        res.status(201).json({
            success: true,
            message: "Welcome to Yelp Camp",
            user: {
                id: registerUser._id,
                username: registerUser.username,
                email: registerUser.email
            }
        });
    });

}));


router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {

        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                error: info?.message || "Invalid username or password"
            });
        }

        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }

            res.status(200).json({
                success: true,
                message: "Welcome back"
            });
        });

    })(req, res, next);
});


router.get('/current-user', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json({
            isAuthenticated: true,
            user: {
                id: req.user._id,
                username: req.user.username,
                email: req.user.email
            }
        });
    }

    res.json({
        isAuthenticated: false
    });
});

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }

            res.clearCookie('connect.sid');

            res.json({
                success: true,
                message: 'Logged out successfully'
            });
        });
    });
});












module.exports = router;