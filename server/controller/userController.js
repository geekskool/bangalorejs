const fetch = require('node-fetch')
const userModel = require('../model/userModel')
const adminModel = require('../model/adminModel')

const user = {
  save: (req, res) => {
    if (req.session) {
      let email = req.session.admin || req.session.user
      if (email === req.body.email) {
        return userModel.saveUserInfo(req.body)
        .then(() => {
          res.status(200).send()}) 
      }
    }
    return res.status(401).send()
  },

  logout: (req, res) => {
    return req.session.destroy(() => res.status(200).send())
  },

  getUserInfo: (req, res) => {
    const { email } = req.body
    if (req.session) {
      return userModel.getUserProfile(email)
      .then(obj => {
        if (req.session.admin) {
          return res.status(200)
            .json({profile: JSON.parse(obj), admin: true})
        }
        if (req.session.user) {
        return res.status(200)
          .json({profile: JSON.parse(obj), admin: false})
        }
    return res.status(401).send('resource cannot be fetched')
      })
    }
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
              return adminModel.getAllAdmins()
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
