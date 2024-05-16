const express = require("express");
const passport = require("passport");

const { loginLocalFailed, logoutRequest, signupRequest } = require("../controllers/authController");

const router = express.Router();


//create a POST route
router.post("/login/local",
    passport.authenticate("local", {failureRedirect: "/login/local/failed"}),
    (request, response, next) => {
        response
        .status(200)
        .json({
            success: {message: "User logged in"}, 
            data: 
            {username: request.user.username,
                firstName: request.user.firstName,
                lastName: request.user.lastName,}, 
                statusCode: 200})
    }
);

router.get("/login/local/failed", loginLocalFailed);

router.get("/logout", logoutRequest);

router.post("/signup", signupRequest);


//GITHUB ROUTES
router.get("/login/github", passport.authenticate('github'));

router.get("/login/github/failed", (request, response, next)=> {
    response.json({message: "There is a problem with GitHub authentication"})
});

router.get("/auth/github", passport.authenticate('github', {
    successRedirect: "/",
    failureRedirect: "/login/github/failed"
}));


//GOOGLE ROUTES
router.get("/login/google", passport.authenticate('google',{scope: ['profile']}));

router.get("login/google/failed", (request, response, next) => {
    response.json({message: "There is a problem with Google Authentication"})
});

router.get("/auth/google", passport.authenticate('google', {
    successRedirect: "/",
    failureRedirect: "/login/local/failed"
}));

module.exports = router;