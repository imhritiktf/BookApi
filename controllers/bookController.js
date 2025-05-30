import Book from "../models/Book.js";
import Review from "../models/Review.js";

// add book
export const addBook = async (req, res) => {
  console.log("add book")
  try {
    console.log("Request body:", req.body); // Log incoming data
    console.log("User ID:", req.user?._id); // Verify user exists
    
    const { title, author, genre, publishedYear } = req.body;
    if (!title || !author || !genre || !publishedYear) {
      console.log("Missing fields detected");
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const book = new Book({ ...req.body, createdBy: req.user._id });
    await book.save();
    console.log("Book created successfully:", book);
    res.status(201).json(book);
  } catch (error) {
    console.log("Error in addBook:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};  

// get books
export const getBooks = async (req, res) => {
  try {
    const { author, genre, page = 1, limit = 10 } = req.query;

    const filter = {};

    if (author) filter.author = new RegExp(author, "i");
    if (genre) filter.genre = new RegExp(genre, "i");

    const books = await Book.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// get book By id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book)
      return res.status(400).json({
        message: "Book not found",
      });

    const reviews = await Review.find({ book: book._id }).populate(
      "user",
      "username"
    );
    const avgRating = await Review.aggregate([
      { $match: { book: book._id } }, 
      {
        $group: {
          _id: "$book",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      book,
      avgRating,
      reviews,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { q } = req.query;

    const books = await Book.find({
      $or: [
        { title: new RegExp(q, "i") },
        { genre: new RegExp(q, "i") },
        { author: new RegExp(q, "i") },
      ],
    });

    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

