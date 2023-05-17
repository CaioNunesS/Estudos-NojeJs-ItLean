import '../../config/db.js'
import BookModel from '../books/book.model.js'
import AuthorModel from '../authors/author.model.js'
import RelationAuthorAndBook from './relations.model.js'

export const addAuthorBook = async (req, res) => {
    const { authorId, bookId } = req.body

    const author = await AuthorModel.findByPk(authorId)
    const book = await BookModel.findByPk(bookId)
    if (!author) return res.status(400).json({ message: 'Author not found' })
    if (!book) return res.status(400).json({ message: 'Book not found' })

    RelationAuthorAndBook.create({
        authorId: author.id,
        bookId: book.id
    })
    let data = {
        authorName: author.name,
        bookTitle: book.name
    }

    return res.status(200).json({ message: 'relação criada', data: data })
}

export const updateRelation = async (req, res) => {
    await RelationAuthorAndBook.update(
        {
            authorId: req.body.authorId,
            bookId: req.body.bookId
        },
        {
            where: {
                id: req.params.id
            },
        }
    )
    RelationAuthorAndBook.findByPk(req.params.id).then((result) => res.json(result))
}

export const relationList = async (req, res) => {
    const relations = await RelationAuthorAndBook.findAll();
    for (let relation of relations) {

        const author = await AuthorModel.findByPk(relation.authorId)
        const book = await BookModel.findByPk(relation.bookId)
        relation.authorId = author
        relation.bookId = book
    }
    res.json(relations)
}

export const findRelationById = async (req, res) => {
    RelationAuthorAndBook.findByPk(req.params.id).then((result) => res.json(result))
}

export const deleteRelation = async (req, res) => {
    const { id } = req.params;
    let relation = await RelationAuthorAndBook.findByPk(id);
    if (!relation)
        return res.status(400).json({ message: "relation not found." });
    await RelationAuthorAndBook.destroy({
        where: {
            id: req.params.id,
        },
    })

    res.json({ message: "relation deleted" })

}









