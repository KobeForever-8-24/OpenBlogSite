const { exec, escape } = require('../db/mysql') 
const { generatePassword } = require('../utils/cryp')

const login = async (username, password) => {

    username = escape(username)

    // 生成加密密码
    password = generatePassword(password)
    password = escape(password)
    
    const sql = `
        select username, realName from users where username=${username} and password=${password}
    `

    const rows = await exec(sql)
    return rows[0] || {}
    // return exec(sql).then(rows => {
    //     // select 返回的都是数组
    //     return rows[0] || {}
    // })
}

module.exports = {
    login
}