const Sequelize = require('sequelize')
const seq = require('../seq')

const Blog = seq.define(
    'blog', // 对应数据库的 blogs 表（英文复数）
    {
        /* 不用定义 id ，seq 会自动增加 */

        title: {
            type: Sequelize.STRING,
            allowNUll: false
        },

        content: {
            type: Sequelize.TEXT, // TEXT 可存储大文件
            allowNUll: false
        },

        author: {
            type: Sequelize.STRING,
            allowNUll: false
        },

        /* 不用定义 createTime ，seq 会自动增加 createdAt 和 updatedAt */
    }
)

module.exports = Blog
