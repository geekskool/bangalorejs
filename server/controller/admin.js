const util = require('../model/utils.js')

const admin = {
  validate: (req, res) => {
    if (req.session.admin) {
      return res.status(200).send('User Authentified')
    }
    return res.status(403).send('Invalid User')
  },
  getEvents: (req, res) => {
    if (req.session.admin) {
      return util.getAllEvent().then((events) => {
        res.json(events.map((event) => JSON.parse(event)))
      })
    }
    return res.status(401).send('Not Authorized')
  },
  getAdmins: (req, res) => {
    if (req.session.admin) {
      return util.getAllAdmins().then(admins => res.json(admins))
    }
    return res.status(401).send('Not Authorized')
  },
  
  addAdmin: (req, res) => {
    if (req.session.admin) {
      return util.addAdmin(req.body.email)
        .then(result => res.json(result))
        .catch(result => res.status(406).json(result))
    }
    return res.status(401).send('Not Authorized')
  },
  
  removeAdmin: (req, res) => {
    if (req.session.admin) {
      console.log(req.body, 'printing body')
      if (!(req.body.email === req.session.admin) && typeof req.body.email === 'string') {
        return util.delAdmin(req.body.email).then(result => res.json(result)) 
      }
      return res.status(406).send('Invalid Request')
    }
    return res.status(401).send('Not Authorized')
  }
}

module.exports = admin
