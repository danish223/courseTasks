const express = require("express");
const router = express.Router();
const bookController = require("../Controller/book");

router.get("/books", bookController.getAllBooks);

router.get("/books/:isbn", bookController.getBookByISBN);

router.get("/books/author/:author", bookController.getBooksByAuthor);

router.get("/books/title/:title", bookController.getBooksByTitle);

router.get("/books/:isbn/review", bookController.getBookReview);

router.put("/books/review/:isbn", bookController.addOrUpdateReview);

router.delete("/books/review/:isbn", bookController.deleteReview);



module.exports = router;
