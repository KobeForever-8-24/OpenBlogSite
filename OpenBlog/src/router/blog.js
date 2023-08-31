const {
    getList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 统一的登陆验证函数
const loginCheck = (req) => {
    if (!req.session.username) {
        return Promise.resolve(new ErrorModel('Not Login yet!'))
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method // GET POST

    const id = req.query.id
    // 获取博客列表
    if (method === 'GET' && req.path === '/api/blog/list') {
        let author = req.query.author || ''
        const keyword = req.query.keyword || ''

        if(req.query.isadmin){
            // 管理员界面
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult){
                // 未登录
                return loginCheckResult
            }
            // 强制查询自己的博客
            author = req.session.username
        }

        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取博客详情
    if (method === 'GET' && req.path === '/api/blog/detail') {
        // const data = getDetail(id)
        // return new SuccessModel(data)
        const result = getDetail(id)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 新建一篇博客
    if (method === 'POST' && req.path === '/api/blog/create') {
        // const data = createBlog(req.body)
        // return new SuccessModel(data)

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 未登录
            return loginCheckResult
        }
        req.body.author = req.session.username
        const result = createBlog(req.body)
        return result.then(data => {
            return new SuccessModel(data)
        })
    }

    // 更新一篇博客
    if (method === 'POST' && req.path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 未登录
            return loginCheckResult
        }
        const result = updateBlog(id, req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel('Update success!')
            } else {
                return new ErrorModel('Update fail!')
            }
        })
    }

    // 删除一篇博客
    if (method === 'POST' && req.path === '/api/blog/delete') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            // 未登录
            return loginCheckResult
        }
        const author = req.session.username
        const result = deleteBlog(id, author)
        return result.then(val => {
            if (val) {
                return new SuccessModel('Delete success!')
            } else {
                return new ErrorModel('Delete fail!')
            }
        })

    }
}

module.exports = handleBlogRouter