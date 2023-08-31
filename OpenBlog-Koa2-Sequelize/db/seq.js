const Sequelize = require('sequelize')
const { MYSQL_CONF } = require('../config/db')

const conf = {
    host: MYSQL_CONF.host,
    dialect: 'mysql'
}

// 生产环境下，使用连接池
if (env === 'production') {
    conf.pool = {
        max: 5, // 连接池中最大连接数量
        min: 0, // 连接池中最小连接数量
        idle: 10 * 1000 // 如果一个连接 10 秒钟内没有被使用过的话，那么就释放线程
    }
}

// 创建 sequelize 实例
const seq = new Sequelize(
    // 数据库名称
    MYSQL_CONF.database_seq,
    MYSQL_CONF.user,
    MYSQL_CONF.password,
    conf
)

