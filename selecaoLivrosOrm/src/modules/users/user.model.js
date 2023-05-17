import { Sequelize, DataTypes } from 'sequelize';
import db from '../../config/db.js'
import bcrypt from 'bcrypt'

const UserModel = db.define("user", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
},
    {
        timestamps: true,
        hooks: {
            beforeSave: async (user) => {
                let hashedPassword = await bcrypt.hash(user.password, 10);
                user.password = hashedPassword;
            },
        },
    });

UserModel.prototype.matchPasswords = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password);
    return isMatch;
};
UserModel.sync({ force: false })

export default UserModel;