import '../../config/db.js'
import BookModel from './book.model.js'
import AuthorModel from '../authors/author.model.js'
import RelationAuthorAndBook from '../authorsAndBooks/relations.model.js'

const create = async (req, res) => {
    const { name, photo } = req.body
    const image = `${process.env.URL_IMAGE}/${photo}`;

    const getBookDb = await BookModel.findOne({ where: { name: name } })
    if (getBookDb) {
        return res.status(400).json({ message: 'Duplicated book.' })
    }

    BookModel.create({
        name,
        photo: image

    })
    return res.status(201).json({ message: 'Book created', data: req.body })
}

const update = async (req, res) => {
    await BookModel.update(
        {
            name: req.body.name,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
    BookModel.findByPk(req.params.id).then((result) => res.json(result))
}

const listAll = async (req, res) => {
    const books = await BookModel.findAll();
    res.json(books)
}

const findById = async (req, res) => {
    let authors = []
    const book = await BookModel.findByPk(req.params.id)
    const bookRelations = await RelationAuthorAndBook.findAll({
        where: { bookId: book.id }

    })
    for (const authorRelation of bookRelations) {
        const authorId = authorRelation.authorId
        let author = await AuthorModel.findByPk(authorId)
        authors.push(author)
    }
    let data = {
        book,
        authors
    }
    res.json(data)
}

const remove = async (req, res) => {
    const { id } = req.params;
    let book = await BookModel.findByPk(id);
    if (!book)
        return res.status(400).json({ message: "book not found." });
    await BookModel.destroy({
        where: {
            id: req.params.id,
        },
    })

    res.json({ message: "book deleted" })

}

export { listAll, findById, create, update, remove }
