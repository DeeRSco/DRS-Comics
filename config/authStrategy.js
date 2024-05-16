// require passport & bcrypt
const passport = require("passport");
const bcrypt = require("bcrypt");

//define the local, GitHub, and Google Strategy's by requiring the passport parameters and the .Strategy class
const LocalStrategy = require("passport-local").Strategy;
const GithubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//require the user model
const User = require("../models/userModel");

//LOCAL STRATEGY

//initialize a new LocalStrategy by defining a function called verify w. 3 parameters (username, password, done)
//within LocalStrategy, find the User by findeOne() and target username as the parameter


passport.use(
    new LocalStrategy(
        (verify = (username, password, done) => {
            User.findOne({username: username}).then((user)=> {
                if (!user) {
                    return done(null, false, {message: "User not found"});
                }
                bcrypt.compare(password, user.password, (error, result) => {
                    console.log(`Result: ${result}`)
                    if (error) {
                        return done(error);
                    }
                    return done(null, user);
                });
            })
            .catch((error)=> {
                console.log(`There was an error: ${error}`);
            })
        })
    )
);

//GITHUB STRATEGY

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github'
},
(accessToken, refreshToken, profile, done)=> {
    console.log(profile);
    return done(null, profile);
}
));



//GOOGLE STRATEGY
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback'
    
},
(accessToken, refreshToken, profile, done)=>{
    console.log(profile);
    return done(null, profile);
}
));

//SERIALIZE & DESERIALIZE USER FUNCTIONS
passport.serializeUser((user, done)=> {
    done(null, user);
});

passport.deserializeUser((user, done)=> {
    done(null, user);
});


