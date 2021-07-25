const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')

async function authenticate(req, res, next){
    try {
        let decoded = await verifyToken(req.headers.access_token)

        const result = await User.findOne(decoded.email)
        console.log(result, 'nih result findONe email')

        if(!result){
          return res.status(400).json({
              message: 'Please login first!'
          })
        } else {
          req.user = result
          next()
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    authenticate
}