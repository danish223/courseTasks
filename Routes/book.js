const express = require("express");
const router = express.Router();
const { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle, getBookReview } = require("../Controller/book");

// Route to get all books
router.get("/", getAllBooks);

router.get("/:isbn", getBookByISBN);

router.get('/books/author/:authorName', getBooksByAuthor);

router.get('/books/title/:title', getBooksByTitle);

router.get('/books/:isbn/review', getBookReview);




module.exports = router;