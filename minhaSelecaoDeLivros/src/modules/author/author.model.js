import mongoose from 'mongoose'

const { Schema } = mongoose
 
const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    books:[
        {
            type: Schema.Types.ObjectId,
            ref: 'book'
        }
    ]
})

export const authorModel = mongoose.model('author', authorSchema)