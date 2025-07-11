const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/_db')

class User extends Model {
    static associate(models) {
        User.hasMany(models.posts)
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, 
    {
        sequelize,
        modelName: 'users'
    }
)

module.exports = User