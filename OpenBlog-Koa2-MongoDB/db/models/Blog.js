// 对应 Blog集合（collection）

const mongoose = require('../mongo')

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true // 必需
    },
    content: String,
    author: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Blog = mongoose.model('blog', BlogSchema)

module.exports = Blog