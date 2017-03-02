const express = require("express");
const validator = require("validator");

const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
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

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */

function validateLoginForm(payload) {
    const errors = {};
    let isFormValid = true;
    let message = "";

    // make sure an email is provided and is a string.
    if (!payload || typeof payload.email !== "string" || payload.email.trim().length === 0) {
        isFormValid = false;
        errors.email = "Please an email address.";
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
router.post("/signup", (req, res) => {
    console.log("/auth/signup POST received.");

    const validationResult = validateSignupForm(req.body);
    if (validationResult.success === false) {
        return res.status(400).json({
            success: false,
            message: validationResult.message,
            errors: validationResult.errors
        })
    } else {
        return res.status(200).end();
    }    
})

// Route for login.
router.post("/login", (req, res) => {
    console.log("/auth/login POST received.");

    const validationResult = validateLoginForm(req.body);
    if (validationResult.success === false) {
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
