import mongoose from "mongoose";


const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: String,
    genre: String,
    publishedYear: Number,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });   

export default mongoose.model('Book', bookSchema);