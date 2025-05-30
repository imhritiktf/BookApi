import mongoose from "mongoose";


const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: String,

})

reviewSchema.index({ user: 1, book: 1 }, { unique: true });

export default mongoose.model("Review", reviewSchema)
