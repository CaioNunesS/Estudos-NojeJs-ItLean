import AuthorModel from './author.model.js'
import '../../config/db.js'
import RelationAuthorAndBook from '../authorsAndBooks/relations.model.js';
import BookModel from '../books/book.model.js';

const listAll = async (req, res) => {
    const authors = await AuthorModel.findAll({
    });

    res.json(authors)
}

const findByPk = async (req, res) => {
    let books = []
    const author = await AuthorModel.findByPk(req.params.id)
    const authorRelations = await RelationAuthorAndBook.findAll({
        where: { authorId: author.id }
    })
    for (const bookRelation of authorRelations) {
        const bookId = bookRelation.bookId
        let book = await BookModel.findByPk(bookId)
        books.push(book)
    }
    let data = {
        author,
        books
    }
    res.json(data)
}

const create = async (req, res) => {
    const { name } = req.body
    const getAuthorDb = await AuthorModel.findOne({ where: { name: name } })
    if (getAuthorDb) return res.status(400).json({ message: 'Duplicated author.' })

    AuthorModel.create({
        name: req.body.name
    })

    res.status(201).json({ message: "book created", data: req.body })
}

const update = async (req, res) => {
    await AuthorModel.update(
        {
            name: req.body.name,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
    AuthorModel.findByPk(req.params.id).then((result) => res.json(result))
}

const remove = async (req, res) => {
    const { id } = req.params;
    let author = await AuthorModel.findByPk(id);
    if (!author)
        return res.status(400).json({ message: "Author not found." });
    await AuthorModel.destroy({
        where: {
            id: req.params.id,
        },
    })
    res.json({ message: "Author deleted" })

}

export { create, remove, listAll, findByPk, update }