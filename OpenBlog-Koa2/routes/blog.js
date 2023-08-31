const router = require('koa-router')()
const {
    getList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || ''
    const keyword = ctx.query.keyword || ''

    if (ctx.query.isadmin) {
        // 管理员界面
        if (ctx.session.username == null) {
            // 未登录
            ctx.body = new ErrorModel('Not yet Login')
            // res.json(
            //     new ErrorModel('Not yet Login')
            // )
            return
        }
        // 强制查询自己的博客
        author = ctx.session.username
    }

    const listData = await getList(author, keyword)

    ctx.body = new SuccessModel(listData)

    // const result = getList(author, keyword)
    // return result.then(listData => {
    //     res.json(
    //         SuccessModel(listData)
    //     )
    // })
})

router.get('/detail', async function(ctx, next) {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
    // const result = getDetail(ctx.query.id)
    // return result.then(data => {
    //     res.json(
    //         new SuccessModel(data)
    //     )
    // })
})

router.post('/create', loginCheck, async function(ctx, next) {
    const body = ctx.request.body
    body.author = ctx.session.username
    const result = await createBlog(body)
    ctx.body = new SuccessModel(data)
    // return result.then(data => {
    //     res.json(
    //         new SuccessModel(data)
    //     )
    // })
})

router.post('/update', loginCheck, async function(ctx, next) {
    const val = await updateBlog(ctx.query.id, ctx.request.body)
    if (val) {
        ctx.body = new SuccessModel('Update success!')
    } else {
        ctx.body = new ErrorModel('Update fail!')
    }
})

router.post('/delete', loginCheck, async function(ctx, next) {
    const author = ctx.session.username
    const val = await deleteBlog(ctx.query.id, author)
    if (val) {
        ctx.body = new SuccessModel('Delete success!')
    } else {
        ctx.body = new SuccessModel('Delete fail!')

    }
})

module.exports = router