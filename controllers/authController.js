const passport = require("passport");
const bcrypt = require("bcrypt");

const loginLocalFailed = (request, response, next) => {
    response.status(401).json({error: {message: "Username or password is incorrect"}, statusCode: 401})
};

const logoutRequest = (request, response, next) => {
    request.logout((error) => {
        if (error) {
            response.status(400).json({error: {message: "Something went wrong!"}, statusCode: 400})
        }
        response.status(200).json({success: {message: "User logged out!"}, statusCode: 200})
    })
};

const signupRequest = (request, response, next) => {
    const { firstName, lastName, username, password } = request.body
    bcrypt.hash(password, 10, async (error, hashedPassword) => {
        if (error) {
            return next(error)
        }
        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hashedPassword,
        })
        try {
            await newUser.save();
            request.login(newUser, (error) => {
                if (error) {
                    response.status(400).json({error: {message: "Something went wrong while signing up!"}, statusCode: 400})
                }
            })
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.username) {
                response.status(400).json({error: {message: "Username already exisits"}, statusCode: 400})
            } else {
                response.status(500).json({error: {message: "Internal server error"}, statusCode: 500})
            }
        }
    })
};

module.exports = {loginLocalFailed, logoutRequest, signupRequest}