const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { set } = require('../db/redis')


const handleUserRouter = (req, res) => {
    const method = req.method // GET POST

    // 登陆
    if (method === 'POST' && req.path === '/api/user/login') {
        const { username, password } = req.body
        // const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {

                // 设置session
                req.session.username = data.username
                req.session.realName = data.realName

                // if(typeof req.session !== 'string'){
                //     JSON.parse(req.session)
                // }
                // 同步到 redis
                set(req.sessionId, req.session)

                return new SuccessModel()
            } else {
                return new ErrorModel('Login failure!')
            }
        })
    }
    
    // // 登陆验证的测试
    // if(method === 'GET' && req.path === '/api/user/login-test'){
    //     if(req.session.username){
    //         return Promise.resolve(new SuccessModel({
    //             session: req.session
    //         }))
    //     }
    //     return Promise.resolve(ErrorModel('Not yet logged in!'))
    // }


}

module.exports = handleUserRouter