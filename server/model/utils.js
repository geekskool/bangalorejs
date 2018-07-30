const Redis = require('./redis')

const util = {
  getEvent: (eventId) => {
    let selectedIndex = -1
    let selectedEvent
    return Redis.lrange('events', 0, -1).then((events) => {
      events.forEach((event, index) => {
        const eventObj = JSON.parse(event)
        if (eventObj.id === eventId) {
          selectedEvent = eventObj
          selectedIndex = index
        }
      })
      return {selectedEvent, selectedIndex}
    })
  },

  addEventToIndex: (index, event) => {
    return Redis.lset('events', index, JSON.stringify(event))
  },

  getUserProfile: (email) => {
    return Redis.hget('users', email)
  },

  createEvent: (obj) => {
    return Redis.lpush('events', JSON.stringify(obj))
  },

  getAllEvent: () => {
    return Redis.lrange('events', 0, -1)
  },

  saveUserInfo: ({email, name, id, image, aboutme, display}) => {
    return Redis.hmset('users', email, JSON.stringify({email, name, id, image, aboutme, display}))
  },
  
  getAllAdmins: () => {
    return Redis.lrange('Admin', 0, -1)
  },

  delAdmin: (email) => {
    return Redis.lrem('Admin', 1, email)
  },

  addAdmin: async (email) => {
    let allAdmins = await util.getAllAdmins()
    let result = await allAdmins
    if (!result.includes(email)) {
      return Redis.lpush('Admin', email)
    }
    return Promise.reject('Admin aleady in db')
  }
}

module.exports = util
