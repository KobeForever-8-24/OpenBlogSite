const seq = require('./db')

// 需要同步的模型
require('./model/Blog')
require('./model/User')

// 测试链接
seq.authenticate().then(() => {
    console.log('sequelize connect success!')
}).catch(() => {
    console.log('dequelize connect failed...')
})

// 同步数据
seq.sync({ force: true }).then(() => {
    process.exit() // 退出进程
})