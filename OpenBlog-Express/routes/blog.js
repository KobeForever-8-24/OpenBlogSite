const {
    getList,
    getDetail,
    createBlog,
    updateBlog,
    deleteBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')
var express = require('express');
var router = express.Router();
const loginCheck = require('../middleware/loginCheck')

router.get('/list', function (req, res, next) {
    let author = req.query.author || ''
    const keyword = req.query.keyword || ''

    if (req.query.isadmin) {
        // 管理员界面
        if (req.session.username == null) {
            // 未登录
            res.json(
                new ErrorModel('Not yet Login')
            )
            return
        }
        // 强制查询自己的博客
        author = req.session.username
    }

    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(
            SuccessModel(listData)
        )
    })
});

router.get('/detail', (req, res, next) => {
    const result = getDetail(req.query.id)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/create', loginCheck, (req, res, next) => {
    req.body.author = req.session.username
    const result = createBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
});

router.post('/update', loginCheck, (req, res, next) => {
    const result = updateBlog(req.query.id, req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel('Update success!')
            )
        } else {
            res.json(
                new ErrorModel('Update fail!')
            )
        }
    })
});

router.post('/delete', loginCheck, (req, res, next) => {
    const author = req.session.username
    const result = deleteBlog(req.query.id, author)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel('Delete success!')
            )
        } else {
            res.json(
                new ErrorModel('Delete fail!')
            )
        }
    })
});

module.exports = router;