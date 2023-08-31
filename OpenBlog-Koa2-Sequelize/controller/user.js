const User = require('../db/model/User')


async function login(username, password) {
    const user = await User.findOne({
        // 条件
        where: {
            username,
            password
        }
    })
    if (user == null) {
        return null
    }
    return user.dataValues
}

module.exports = {
    login
}