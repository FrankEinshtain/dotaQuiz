const express = require('express')
const bodyParser = require('body-parser')
// const path = require('path')
const { getQuestion } = require('./src/servLib')
const app = express()
const port = 8000

app.use(express.static(__dirname))
// app.use(express.static(path.join('__dirname', '/build')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.listen(port, () => {
  console.log(`We Are Live on ${port}!`)
})

app.get('/question', (req, res) => {
  console.log(`I GOT A 'question' REQUEST`)
  getQuestion()
    .then(imgBase => {
      return res.status(200).send(imgBase)
    })
    .catch(console.error)
})
