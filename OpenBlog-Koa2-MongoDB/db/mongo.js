const mongoose = require('mongoose')

const url = 'mongodb://localhost:27017'
const dbName = 'myBlog'


mongoose.connect(`${url}/${dbName}`)

const db = mongoose.connection

db.on('error', err => {
    console.error(err)
})

// 连接成功
// db.once('open', () => {
//     console.log('mongoose connect success!')
// })

module.exports = mongoose