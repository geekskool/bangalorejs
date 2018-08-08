const Redis = require('./redis')

const eventModel = {
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
        return {selectedEvent, selectedIndex}
      })
  },

  addEventToIndex: (index, event) => {
    Redis.lset('events', index, JSON.stringify(event))},
  
  getAllEvents: () => Redis.lrange('events', 0, -1),

  createEvent: obj => Redis.lpush('events', JSON.stringify(obj)),
}

module.exports = eventModel