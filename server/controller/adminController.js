const adminModel = require('../model/adminModel')
const eventModel = require('../model/eventModel')

const admin = {
  
  validate: (req, res) => {
    if (req.session.admin) {
      return res.status(200).send('Admin Authenticated')
    }
    return res.status(403).send('Invalid User')
  },

  getEvents: (req, res) => {
    if (req.session.admin) {
      return eventModel.getAllEvents()
        .then((events) => {
          res.json(events.map((event) => JSON.parse(event)))
       })
    }
    return res.status(401).send('Not Authorized')
  },

  getAdmins: (req, res) => {
    if (req.session.admin) {
      return adminModel.getAllAdmins()
        .then(admins => res.json(admins))
    }
    return res.status(401).send('Not Authorized')
  },
  
  addAdmin: (req, res) => {
    if (req.session.admin) {
      return adminModel.addAdmin(req.body.email)
        .then(result => res.json(result))
        .catch(result => res.status(406).json(result))
    }
    return res.status(401).send('Not Authorized')
  },
  
  removeAdmin: (req, res) => {
    if (req.session.admin) {
      if (!(req.body.email === req.session.admin)) {
        return adminModel.delAdmin(req.body.email)
          .then(result => res.json(result)) 
      }
      return res.status(406).send('Invalid Request')
    }
    return res.status(401).send('Not Authorized')
  }
}

module.exports = admin
