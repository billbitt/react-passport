const express = require("express");
const validator = require("validator");
const passport = require("passport");

const router = new express.Router();

/*
    Validate the sign up form

    @param {object} payload - the HTTP body message
    @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for the whole form.
 */

function validateSignupForm(payload) {
    //console.log("validating signup form.  Payload:", payload);
    const errors = {};
    let isFormValid = true;
    let message = "";

    // make sure an email is provided, is an email, and is a string.
    if (!payload || typeof payload.email !== "string" || !validator.isEmail(payload.email)) {
        isFormValid = false;
        errors.email = "Please provide a correct email address.";
    }

    // Make sure a passowrd is provided, is a string, and is >= 8 characters 
    if (!payload || typeof payload.password !== "string" || payload.password.trim().length < 8) {
        isFormValid = false;
        errors.password = "Password must have at least 8 characters.";
    }

    if (!payload || typeof payload.name !== "string" || payload.name.trim().length === 0) {
        isFormValid = false;
        errors.name = "Please provide your name.";
    }

    if (isFormValid === false) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

/*
    Validate the login form.
    @param {object} payload - the HTTP body message
    @returns {object} The result of validation. Object contains a boolean validation result, errors tips, and a global message for the whole form.
*/

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = "";

    // make sure an email is provided and is a string.
    if (!payload || typeof payload.email !== "string" || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = "Please enter an email address.";
    }

    // Make sure a password is provided and is a string 
    if (!payload || typeof payload.password !== "string" || payload.password.trim().length === 0) {
        isFormValid = false;
        errors.password = "Password must have at least 8 characters.";
    }

    if (!isFormValid) {
        message = "Check the form for errors.";
    }

    return {
        success: isFormValid,
        message,
        errors
    };
}

// POST ROUTES
// Route for signup.
router.post("/signup", (req, res, next) => {
    //console.log("/auth/signup POST received.");
    const validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    } else {
        return passport.authenticate("local-signup", (err) => {
            // handle errors.
            if (err) {
                // check for a specific mongo error.
                if (err.name === "MongoError" && err.code === 11000){
                    // the 11000 Mongo code is for a duplication email error.
                    // the 409 HTTP status code is for conflict error.
                    return res.status(409).json({
                        success: false,
                        message: "Check the form for error.",
                        errors: {
                            email: "This email is already taken."
                        }
                    });
                }
                // as a default for other errors, return the below.
                return res.status(400).json({
                    success: false,
                    message: "Could not process the form."
                });
            }
            // success case.
            return res.status(200).json({
                success: true,
                message: "You have successfully signed up! Now you should be able to log in."
            });
        })(req, res, next);
    }    
});

// Route for login.
router.post("/login", (req, res, next) => {
    //console.log("/auth/login POST received.");
    const validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    } else {
        return res.status(200).end();
    }    
})

module.exports = router;
