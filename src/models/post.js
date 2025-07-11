const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/_db')

class Post extends Model {
    static associate(models) {
        Post.belongsTo(models.users)
    }
}

Post.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.UUID,
            allowNull: false
        },
        state: {
            type: DataTypes.ENUM('draft', 'published'),
            defaultValue: 'draft'
        },
        tags: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            defaultValue: []
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false
        },
    }, 
    {
        sequelize,
        modelName: 'posts'
    }
)

module.exports = Post