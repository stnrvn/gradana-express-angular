const { getDatabase } = require('../config/mongodb')

class User{
  static get() {
    return getDatabase().collection('users').find().toArray()
  }
  static register(user) {
    return getDatabase().collection('users').insertOne(user)
  }
  static findOne(email){
    return getDatabase().collection('users').find({"email": email}).toArray()
  }
}

module.exports = User