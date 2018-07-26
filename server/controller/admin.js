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
  }
}

module.exports = admin
