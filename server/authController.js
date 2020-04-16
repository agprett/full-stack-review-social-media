const bcrypt = require('bcryptjs')

module.exports = {
  login: async(req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body

    const [existingUser] = await db.check_user([email])

    if(!existingUser){
      return res.status(404).send('Email or password incorrect')
    }

    const authenticated = bcrypt.compareSync(password, existingUser.password)

    if(authenticated){
      delete existingUser.password

      req.session.user = existingUser

      res.status(200).send(req.session.user)
    } else {
      res.status(403).send('Email or password incorrect')
    }
  },

  register: async(req, res) => {
    const db = req.app.get('db')
    const {email, password} = req.body

    const [existingUser] = await db.check_user([email])

    if(existingUser){
      return res.status(409).send('User already exists')
    }

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    const [newUser] = await db.register_user([email, hash])

    req.session.user = newUser

    res.status(200).send(req.session.user)
  },

  logout: (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  },

  getUser: (req, res) => {
    if(req.session.user){
      res.status(200).send(req.session.user)
    } else {
      res.sendStatus(404)
    }
  },
}
