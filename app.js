const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const { connect } = require('./config/mongodb')
const router = require('./routes/index')

const app = express()
const port = 5000
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json())

app.use(express.urlencoded({
    extended:true
}))

app.get('/', (req, res) => {
  res.render('index')
})

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })

connect().then(async () => {
  console.log('mongo berhasil connect!')
  
  app.use('/', router)

  app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
  })
})