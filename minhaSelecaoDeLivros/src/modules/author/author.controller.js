import '../../configs/db.js'
import {authorModel} from '../author/author.model.js'
import {bookModel} from '../books/books.model.js'

export const insertAuthor = async (req, res) => {
  
    let createAuthor = await authorModel.create(req.body)

    const {books,__v, ...author } = createAuthor.toObject()

    return res.status(201).json({ message: 'Author registrated', data: author })
}

export const updateAuthor = async (req, res) => {
    
        const { id } = req.params
        const body = req.body


            const updateAuthor = await authorModel.updateOne({ _id: id }, { ...body })

            res.status(201).json({ message: 'Update done with success', updateAuthor })
      
   
}

export const listAuthors = async (req, res) => {
    
        const authorList = await authorModel.find({})
        for (const author of authorList) {
            const books = await bookModel.find({author: author._id}).select('-_id -__v')
            author.books = books
        }

        res.json({ authorList })
    
}

export const getAuthorById = async (req, res) => {
    
        const { id } = req.params
        const author = await authorModel.findById(id)

        res.json({ author })

}


export const deleteAuthor = async (req, res) => {
    
        const { id } = req.params
        const result = await authorModel.deleteOne({ _id: id })

        res.json(result)
    
}

