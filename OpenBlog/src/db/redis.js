const redis = require('redis') // redis v4
const { REDIS_CONF } = require('../config/db.js')
const { memoryStorage } = require('local-memory-storage')


// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)

// 连接数据库
!(async function () {
    await redisClient.connect()
        .then(() => console.log('Redis connect success!'))
        .catch(console.error)
})()

// set
async function set(key, val) {
    memoryStorage.setItem(key, JSON.stringify(val))
    // let objVal
    // if (typeof val === 'object') {
    //     objVal = JSON.stringify(val)
    // } else {
    //     objVal = val
    // }
    // await redisClient.set(key, objVal)
}

// get
async function get(key) {
    try{
        let val = memoryStorage.getItem(key)
        try {
            val = JSON.parse(val)
        } catch (err) { }
        // let val = await redisClient.get(key)
        // if(val == null){
        //     return val
        // }
        //
        // try{
        //     val = JSON.stringify(val) // 尝试转换为 JS 对象
        // }catch(err){ }

        return val
    }catch(err){
        throw err
    }

    // await redisClient.get(key)
}

module.exports = { set, get }


