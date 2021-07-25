const { MongoClient } = require('mongodb')

let database = null

async function connect() {
  try {
    const uri = 'mongodb+srv://sutan:dbtest321@cluster0.bpr5l.mongodb.net/myFirstDatabase?retryWrites=true&writeConcern=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    await client.connect()

    const db = client.db('gradana')

    database = db

    return db
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  connect,
  getDatabase() {
    return database
  }
}