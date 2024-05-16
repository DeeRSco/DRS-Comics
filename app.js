require("dotenv").config();
require("./config/connection");
require("./config/authStrategy");

//Require packages
const express = require("express");
const morgan = require("morgan");
const path = require("node:path");
const session = require("express-session");
const passport = require("passport");
const helmet = require("helmet");


const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");


app.use(helmet({contentSecurityPolicy: false}));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
}
))

app.use(passport.initialize());



//adding routing
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");

//use morgan as middleware
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Create 5 basic GET routes for /, about, login, admin, and admin/create-book
app.get("/", (request, response, next) => {
    // response.send("This route points to the Home Page")
    response.status(200).json({success: {message: "Index Successful - This route points to the Home Page"}, statusCode:200})
});

 app.get("/about", (request, response, next) => {
    // response.send("This route points to the About Page")
    response.status(200).json({success: {message: "This route points to the About Page"}, statusCode:200})
});

app.get("/login", (request, response, next) => {
    // response.send("This route points to the Login Page")
    response.status(200).json({success: {message: "This route points to the Login Page"}, statusCode:200})
});

app.get("/admin", (request, response, next) => {
    // response.send("This route points to the Admin Console Page")
    response.status(200).json({success: {message: "This route points to the Admin Console Page"}, statusCode:200})
});

app.get("/admin/create-book", (request, response, next) => {
    // response.send("This route points to the Create Book Page")
    response.status(200).json({success: {message: "This route points to the Create Book Page"}, statusCode:200})
});



//CREATE 5 NEW GET ROUTES [moved to bookRoutes]


//use the route paths
app.use('/api/books', bookRoutes);
app.use('/', authRoutes);

//start the server by listening
app.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT}`);
    console.log("http://localhost:3000/")
})
