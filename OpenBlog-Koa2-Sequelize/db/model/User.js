const Sequelize = require('sequelize')
const seq = require('../seq')

const User = seq.define(
    'user', // 对应数据库的 users 表（英文复数）
    {
        /* 不用定义 id ，seq 会自动增加 */

        username: {
            type: Sequelize.STRING,
            allowNUll: false
        },

        password: {
            type: Sequelize.STRING,
            allowNUll: false
        },

        realname: {
            type: Sequelize.STRING
        }
    }
)

module.exports = User
