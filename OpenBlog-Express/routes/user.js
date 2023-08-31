const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {

            // 设置session
            req.session.username = data.username
            req.session.realName = data.realName

            res.json(
                new SuccessModel()
            )
            return
        }
        res.json(
            new ErrorModel('Login failure!')
        )

    })
});
// router.get('/login-test', (req, res, next) => {
//     if(req.session.username){
//         res.json({
//             errorNum: 0,
//             msg: 'Login Already'
//         }) 
//         return
//     }
//     res.json({
//         errorNum: -1, 
//         msg: 'Not yet Login'
//     })
// })

// router.get('/session-test', (req, res, next) => {
//     const session = req.session
//     if (session.viewNum == null) {
//         session.viewNum = 0
//     }
//     session.viewNum++
//     res.json({
//         viewNum: session.viewNum
//     })
// })

module.exports = router;