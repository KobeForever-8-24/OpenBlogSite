// const { exec, escape } = require('../db/mysql') 
const { generatePassword } = require('../utils/cryp')
const User = require('../db/models/User')

const login = async (username, password) => {

    // username = escape(username)

    // // 生成加密密码
    // password = generatePassword(password)
    // password = escape(password)
    
    // const sql = `
    //     select username, realName from users where username=${username} and password=${password}
    // `

    // const rows = await exec(sql)
    // return rows[0] || {}
    // // return exec(sql).then(rows => {
    // //     // select 返回的都是数组
    // //     return rows[0] || {}
    // // })
    
    // 生成加密密码
    password = generatePassword(password)

    const userList = await User.find({
        username,
        password
    })

    if(userList.length === 0){
        return {}
    }
    return userList[0]
}

module.exports = {
    login
}