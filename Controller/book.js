const books = require("../Models/book");

// Get all books
exports.getAllBooks = (req, res) => {
  res.json({ books });
};


exports.getBookByISBN = (req, res) => {
    const isbn = req.params.isbn; // Get ISBN from request params
    const book = books[isbn]; // Find book by ISBN
  
    if (book) {
      res.json({
        author: book.author,
        title: book.title,
        reviews: {}
      });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  };


  exports.getBooksByAuthor = (req, res) => {
    const author = req.params.author; // Get author from request params
  
    // Filter books that match the given author
    const booksByAuthor = Object.entries(books)
      .filter(([isbn, book]) => book.author === author)
      .map(([isbn, book]) => ({
        isbn,
        title: book.title,
        reviews: {}
      }));
  
    // Send response
    res.json({ booksbyauthor: booksByAuthor });
  };
  

  exports.getBooksByTitle = (req, res) => {
    const title = req.params.title; // Get title from request params
    const booksByTitle = Object.entries(books)
      .filter(([isbn, book]) => book.title === title)
      .map(([isbn, book]) => ({
        isbn,
        title: book.title,
        reviews: {}
      }));
  
    // Send response
    res.json({ booksbytitle: booksByTitle });
  };



exports.getBookReview = (req, res) => {
    const isbn = req.params.isbn; // Get ISBN from request params
  
    // Check if the book exists
    if (books[isbn]) {
      res.json({});
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  };



  exports.addOrUpdateReview = (req, res) => {
    const { isbn } = req.params; // Get ISBN from URL params
    const review = req.query.review; // Get review from query parameters

    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (!review) {
        return res.status(400).json({ message: "Review is required" });
    }

    books[isbn].reviews = review; // Store the review

    res.json({ message: `The review for the book with ISBN ${isbn} has been added/updated.` });
};


exports.deleteReview = (req, res) => {
    const { isbn } = req.params; // Get ISBN from URL params

    // Check if book exists
    if (!books[isbn]) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Check if reviews exist for the book
    if (!books[isbn].reviews || Object.keys(books[isbn].reviews).length === 0) {
        return res.status(404).json({ message: `No reviews found for ISBN ${isbn}` });
    }

    // Delete all reviews for the book
    books[isbn].reviews = {};

    res.json({ message: `Reviews for the ISBN ${isbn} deleted.` });
};


