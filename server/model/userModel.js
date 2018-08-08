const Redis = require('./redis')

const userModel = {
    getUserProfile: email => Redis.hget('users', email),
  
    saveUserInfo: ({email, name, id, image, aboutme, display}) => {
      Redis.hmset('users', email, 
        JSON.stringify({email, name, id, image, aboutme, display}))}
}

module.exports = userModel