import mongoose from 'mongoose'

const { Schema } = mongoose

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    yearOfRelease: {
        type: Number
    },
    author: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "author"
        }
    
    
})

export const bookModel = mongoose.model('book', bookSchema)