const Redis = require('./redis')

const adminModel = {
  getAllAdmins: () => Redis.lrange('Admin', 0, -1),

  delAdmin: email => Redis.lrem('Admin', 1, email),

  addAdmin: async (email) => {
    let allAdmins = await adminModel.getAllAdmins()
    let result = await allAdmins
    if (!result.includes(email)) {
      return Redis.lpush('Admin', email)
    }
    return Promise.reject('Admin aleady in db')
  }
}

module.exports = adminModel