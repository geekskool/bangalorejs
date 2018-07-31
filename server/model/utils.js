const Redis = require('./redis')

const util = {
  getEvent: (eventId) => {
    let selectedIndex = -1
    let selectedEvent
    return Redis.lrange('events', 0, -1)
    .then(eventsArray => {
      eventsArray.forEach((event, index) => {
        const eventObj = JSON.parse(event)
        if (eventObj.id === eventId) {
          selectedEvent = eventObj
          selectedIndex = index
        }
      })
      return {selectedEvent, selectedIndex}})
  },

  addEventToIndex: (index, event) => Redis
    .lset('events', index, JSON.stringify(event)),

  getUserProfile: email => Redis.hget('users', email),

  createEvent: obj => Redis.lpush('events', JSON.stringify(obj)),

  getAllEvent: () => Redis.lrange('events', 0, -1),

  saveUserInfo: ({email, name, id, image, aboutme, display}) => Redis
    .hmset('users', email, 
      JSON.stringify({email, name, id, image, aboutme, display})),
  
  getAllAdmins: () => Redis.lrange('Admin', 0, -1),

  delAdmin: email => Redis.lrem('Admin', 1, email),

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
