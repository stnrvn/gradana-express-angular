const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
  static async loginView(req, res) {
     res.render('index')
  }

  static async registerView(req, res) {
    res.render('register')
  }

  static async get(req, res) {
    try {
      const users = await User.get()

      return res.status(200).json(users)
    } catch (error) {
      return res.json(error)
    }
  }

  static async submitRegister(req, res) {
    try {
        const opt = {
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          password: hashPassword(req.body.password)
        }

        console.log(opt)
        const checkEmail = await User.findOne(opt.email)

        if(checkEmail.length !== 0){
          return res.json({ message : 'email sudah ada!'})
        }

        const result = User.register(opt)
        // return res.status(201).json(result)
        res.redirect('/login')
    } catch (error) {
        return res.json(error)
    }
  }

  static async submitLogin(req, res) {
    try {
      const opt = {
        email: req.body.email,
        password: req.body.password
      }
      console.log(opt)

      const checkEmail = await User.findOne(opt.email)

      if(!checkEmail){
        return res.status(401).json({
            message: 'Invalid email'
        })
      }

      const match = comparePassword(opt.password, checkEmail[0].password)
      
      if(match){
        const payload = {
          id: checkEmail[0]._id,
          email: checkEmail[0].email
        }

        const access_token = generateToken(payload)

        return res.status(200).json({
            access_token
        })
      } else {
        return res.status(401).json({
            message: 'Invalid password'
        })
      }
    } catch (error) {
      return res.json(error)
      
    }
  }
}

module.exports = UserController