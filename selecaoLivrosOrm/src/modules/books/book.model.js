import db from '../../config/db.js';
import { Sequelize, DataTypes } from 'sequelize';

const BookModel = db.define("books", {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    photo: {
        type: DataTypes.STRING,
    },
});

BookModel.sync({ force: false })
export default BookModel
