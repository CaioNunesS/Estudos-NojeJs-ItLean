import { Sequelize } from 'sequelize';
import db from '../../config/db.js'

const AuthorModel = db.define("authors", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

});
AuthorModel.sync({ force: false })

export default AuthorModel



