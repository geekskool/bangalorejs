const fetch = require('node-fetch')
const util = require('../model/utils')
const Redis = require('../model/redis')

const user = {
  login: (req, res) => {
    return util.saveUserInfo(req.body)
    .then(() => {
      res.status(200).send('success')})
  },

  logout: (req, res) => {
    return req.session.destroy(() => {res.end()})
  },

  getUserInfo: (req, res) => {
    const { email } = req.body
    if (req.session) {
      return util.getUserProfile(email)
      .then((obj) => {
        res.status(200).json(JSON.parse(obj))})
    }
    return res.status(403).send('resource cannot be fetched')
  },

  auth: (req, res) => {
      if (!req.session.admin && !req.session.user) {
        return fetch('https://www.googleapis.com/userinfo/v2/me', 
        {
          method: 'GET', 
          headers: {'Authorization': `Bearer ${req.body.access_token}`}
        })
          .then(response => response.json())
          .then(result => {
            if (result.email === req.body.email) {
              return Redis.lrange('Admin', 0, -1)
              .then((admins) => {
                const isAdmin = admins.filter((admin) => admin === result.email)[0]           
                if (isAdmin) {
                  req.session.admin = result.email
                } else {
                  req.session.user = result.email
                }
                return res.status(201).json(result)})
            }
            return res.status(401).json('login failed')
          })
          .catch(err => res.send(err))
      }
      return res.status(200).json('session in progress')
  }
}

module.exports = user
