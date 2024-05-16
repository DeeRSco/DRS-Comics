const express = require("express");
const router = express.Router();

//moved all book routes here & removed "/api/books" from path
//changed "get" to post/put/delete where appropriate
//changed "app" to router
router.get("/", (request, response, next) => {
    response.status(200).json({success: {message: "This will send all of the book data"}, statusCode: 200});
});

//the route below was previously "/:id", i tried adding "/books" to see if that would correct my routing error but it doesn't seem to be working
router.get("/:id", (request, response, next) => {
    response.status(200).json({success: {message: "This will send all of the books details data, or each book by their ID"}, statusCode: 200});
});

router.post("/create/new", (request, response, next) => {
    response.status(200).json({success: {message: "This will send all of the data that will have the ability to create new books"}, statusCode: 200});
});

router.put("/edit/:id", (request, response, next) => {
    response.status(200).json({success: {message: "This will send all of the update comic book form page data to modify a book by their ID"}, statusCode: 200});
});

router.delete("/delete/:id", (request, response, next) => {
    response.status(200).json({success: {message: "This will send all of the data that will have the ability to delete a book by their ID"}, statusCode: 200});
});

//export so routes are usable
module.exports = router;