// const { exec } = require('../db/mysql')
const xss = require('xss')
const Blog = require('../db/models/Blog')

const getList = async (author, keyword) => {
    // let sql = `select * from blogs where 1=1 `    
    // if(author){
    //     sql += `and author='${author}' `
    // }
    // if(keyword){
    //     sql += `and title like '%${keyword}%' `
    // }
    // sql += `order by createTime desc;`

    // return await exec(sql)

    // 动态拼接查询条件
    const whereOpt = {}
    if (author) {
        whereOpt.author = author
    }
    if (keyword) {
        whereOpt.keyword = new RegExp(keyword)
    }
    const list = await Blog.find(whereOpt).sort({ _id: -1 })
    return list
}

const getDetail = async (id) => {
    // const sql = `select * from blogs where id='${id}'`
    // const rows = await exec(sql)
    // return rows[0]

    // return await exec(sql).then(rows => {
    //     return rows[0]
    // })

    const blog = await Blog.findById(id)
    return blog
}

const createBlog = async (blogData = {}) => {
    // // blogData是一个博客对象，包含title content author 属性
    // const title = xss(blogData.title)
    // const content = xss(blogData.content)
    // const author = blogData.author
    // const createTime = Date.now()

    // const sql = `
    //     insert into blogs(title, content, createTime, author)
    //     values ('${title}', '${content}', ${createTime}, '${author}');
    // `

    // const insertData = await exec(sql)
    // return {
    //     id: insertData.insertId
    // }
    // return exec(sql).then(insertData => {
    //     return {
    //         id: insertData.insertId
    //     }
    // })

    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author

    const blog = await Blog.create({
        title,
        content,
        author
    })

    return {
        id: blog._id
    }

}

const updateBlog = async (id, blogData = {}) => {
    // id 就是要更新博客的id
    // blogData是一个博客对象，包含title content属性
    // const title = xss(blogData.title)
    // const content = xss(blogData.content)

    // const sql = `
    //     update blogs set title='${title}', content='${content}' where id=${id}
    // `

    // const updateData = await exec(sql)
    // if(updateData.affectedRows > 0){
    //     return true
    // }
    // return false

    // return exec(sql).then(updateData => {
    //     // console.log('updateData is ', updateData)
    //     if(updateData.affectedRows > 0){
    //         return true
    //     }
    //     return false
    // })
    const title = xss(blogData.title)
    const content = xss(blogData.content)

    const blog = await Blog.findOneAndUpdate(
        { _id: id },
        { title, content },
        { new: true }
    )
    
    if(blog == null){
        return false
    }
    return true
}

const deleteBlog = async (id, author) => {
    // id就是要删除博客的id
    // const sql = `delete from blogs where id=${id} and author='${author}'`
    // const deleteData = await exec(sql)
    // if (deleteData.affectedRows > 0) {
    //     return true
    // }
    // return false
    // return exec(sql).then(deleteData => {
    //     // console.log('deleteData is ', deleteData)
    //     if(deleteData.affectedRows > 0){
    //         return true
    //     }
    //     return false
    // })

    const blog = await Blog.findOneAndDelete({
        _id: id,
        author
    })

    if(blog == null){
        return false
    }
    return true
}
module.exports = {
    getList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog
}