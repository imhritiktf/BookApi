import Review from "../models/Review.js";

// add review
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment)
      return res
        .status(400)
        .json({ message: "please add the required fields!" });

    const review = await new Review({
      user: req.user._id,
      book: req.params.id,
      rating,
      comment,
    });

    await review.save();
    res.status(201).json({ message: "Review added successfully!", review   });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "you cannot review the twice" });
  }
};

// update review
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!review) return res.status(403).json({ message: "Not allowed" });

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();
    res.json(review);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

//delete review
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!review) return res.status(403).json({ message: "Not allowed" });
    res.json({ message: "Review deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
