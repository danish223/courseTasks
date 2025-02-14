const { isObjectIdOrHexString } = require("mongoose");
const books = require("../Model/book");

// Get all books
const getAllBooks = (req, res) => {
  res.json({ success: true, books });
};


const getBookByISBN = (req, res) => {
    const { isbn } = req.params;
    const book = books.find(b => b.isbn === isbn);
  
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
  
    res.json({ success: true, book });
  };


  // Controller to get books by author
  const getBooksByAuthor = (req, res) => {
    try {
      const authorName = req.params.authorName;
      const booksByAuthor = books.filter(book => book.author.toLowerCase() === authorName.toLowerCase());
  
      if (booksByAuthor.length === 0) {
        return res.status(404).json({ message: 'No books found by this author' });
      }
  
      return res.status(200).json({ success: true, books: booksByAuthor });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving books' });
    }
  };


  // Controller to get books by title
const getBooksByTitle = (req, res) => {
  try {
    const title = req.params.title;
    const booksByTitle = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));

    if (booksByTitle.length === 0) {
      return res.status(404).json({ message: 'No books found with this title' });
    }

    return res.status(200).json({ success: true, books: booksByTitle });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error retrieving books' });
  }
};

// Controller to get a book review
const getBookReview = (req, res) => {
  try {
    const { isbn } = req.params;
    console.log(isbn);
    
    const book = books.find(b => b.isbn === isbn);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (!book.review) {
      return res.status(404).json({ message: "No review available for this book" });
    }

    return res.status(200).json({ success: true, review: book.review });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error retrieving book review' });
  }
};
module.exports = { getAllBooks, getBookByISBN, getBooksByAuthor, getBooksByTitle, getBookReview};
