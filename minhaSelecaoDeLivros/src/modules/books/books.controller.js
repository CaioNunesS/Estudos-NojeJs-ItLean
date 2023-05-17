import '../../configs/db.js'
import { authorModel } from '../author/author.model.js'
import { bookModel } from '../books/books.model.js'

export const insertBook = async (req, res) => {
    // try {
    //     if (!req.body) throw Error('Body is undefined')

    //     const { title, yearOfRelease } = req.body;

    //     if (name.length > 0 ) {
    //         const newBook = new bookModel({
    //             name
    //         })
    //         await newBook.save()
    //         res.status(201).json({ message: 'Book added sucess' })
    //     } 
    //     else {
    //        res.status(400).json({ message: "Informação inválida" })
    //     }

    // } catch (error) {
    //     console.log('error', error);
    //     res.status(400).json({
    //         mensagem: error,
    //     })
    // }

    let createBook = await bookModel.create(req.body)

    const { _id, __v, ...book } = createBook.toObject()
    book.author = await authorModel.findById(book.author).select("-__v -books");

    return res.status(201).json({ message: 'Book registrated', data: book })
}


export const updateBook = async (req, res) => {
    // try {
    //     const { id } = req.params
    //     const body = req.body


    //     if (req.body.name.length > 0) {

    //         const updateBooks = await bookModel.updateOne({ _id: id }, { ...body })

    //         res.status(201).json({ message: 'Update done with success', updateBooks })
    //     } else {
    //         res.json({ message: "Informação inválida" })
    //     }
    // } catch (error) {
    //     res.status(400).json({ message: error })
    // }
    let book = await bookModel.findById(req.params.id)
    if (!book)
        return res.status(httpStatus.BAD_REQUEST).json({ message: 'book not found' })
    Object.assign(book, req.body)
    await book.save()
    return res.json({ message: 'Record updated' })
}

export const bookList = async (req, res) => {
    let booksList = await bookModel.find({},  { __v:0})
    for (const book of booksList) {
        
        book.author = await authorModel.findById(book.author).select("-__v -books");
    }
    return res.json({ data: { booksList } })

}

export const getBookById = async (req, res) => {


    const { id } = req.params
    const book = await bookModel.findById(id)

    if (!book) {

        return res.status(400).json({ message: 'error get specific book!!' })
    }
    return res.json({ book })

}


export const deleteBook = async (req, res) => {
    // try {
    //     const { id } = req.params
    //     const result = await bookModel.deleteOne({ _id: id })

    //     res.json(result)
    // } catch (error) {
    //     res.status(400).json({ message: error })
    // }
    let book = await bookModel.findById(req.params.id)
    if (!book)
        return res
            .status(httpStatus.BAD_REQUEST)
            .json({ message: 'book not found' })
    Object.assign(book, req.body)
    await book.deleteOne()
    return res.json({ message: 'Record deleted' })
}

