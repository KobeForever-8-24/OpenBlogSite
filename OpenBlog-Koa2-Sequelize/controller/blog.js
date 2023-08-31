const Sequelize = require('sequelize')
const Blog = require('../db/model/Blog')
const xss = require('xss')

async function getList(author = '', keyword = '') {
    const whereOpt = {}
    if (author) {
        whereOpt.author = author
    }
    if (keyword) {
        whereOpt.title = {
            [Sequelize.Op.like]: `%${keyword}%`
        }
    }
    const list = await Blog.findAll({
        // 条件
        where: whereOpt,
        // 排序
        order: [
            ['id', 'desc']
        ]
    })

    return list.map(item => item.dataValues)
}

async function getDetail(id) {
    const blog = await Blog.findOne({
        // 条件
        where: { id }
    })
    if (blog == null) {
        return null
    }
    return blog.dataValues
}

async function createBlog(blogData = {}) {
    // blogData {title, content, author}
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author // 系统自己赋值的属性，比较安全

    const blog = await Blog.create({
        title,
        content,
        author
    })

    return {
        // 新创建的博客的id
        id: blog.dataValues.id
    }
}

async function updateBlog(id, blogData = {}) {
    // id
    const title = xss(blogData.title)
    const content = xss(blogData.content)


    const res = await Blog.update(
        {
            // 要更新的内容
            title,
            content
        },
        {
            where: {
                id
            }
        }
    )
    if(res[0] >= 1){
        return true
    }
    return false
}

async function deleteBlog(id, author){
    const res = await Blog.destroy({
        // 条件
        where: {
            id, 
            author
        }
    })
    if(res >= 1){
        return true
    }
    return false
}

module.exports = {
    getList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog
}