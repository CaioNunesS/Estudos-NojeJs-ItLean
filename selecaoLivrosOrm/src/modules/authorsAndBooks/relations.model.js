import { Sequelize, DataTypes } from 'sequelize'
import AuthorModel from '../authors/author.model.js'
import BookModel from '../books/book.model.js'
import db from '../../config/db.js'

const RelationAuthorAndBook = db.define("RelationAuthorAndBook", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
    authorId: {
        type: DataTypes.STRING,
        references: {
            model: AuthorModel,
            key: 'id'
        }
    },
    bookId: {
        type: DataTypes.STRING,
        references: {
            model: BookModel,
            key: 'id'
        }
    }
})
AuthorModel.belongsToMany(BookModel, { through: 'RelationAuthorAndBook', uniqueKey: 'my_custom_unique' });
BookModel.belongsToMany(AuthorModel, { through: 'RelationAuthorAndBook', uniqueKey: 'my_custom_unique' });

RelationAuthorAndBook.sync({force: false})

export default RelationAuthorAndBook

