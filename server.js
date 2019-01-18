const express = require('express')
const bodyParser = require('body-parser')
const { getQuestion, getNextQuestion } = require('./src/servLib')
const app = express()
const port = 8000
// const _ = require('lodash')

app.use(express.static(__dirname))
// app.use(express.static(path.join('__dirname', '/build')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
// console.log(`@@@ITEM: ${arrData[0].info} !`)

app.listen(port, () => {
  console.log(`We Are Live on ${port}!`)
})

app.get('/question', (req, res) => {
  console.log(`I GOT A 'question' REQUEST`)
  getQuestion()
    .then(question => {
      return res.status(200).send(question)
    })
    .catch(console.error)
})

app.post('/nextQuestion', (req, res) => {
  // console.log(`I got a 'NEXT QUESTION' request`)
  console.log(`I Got The Answers\n${req.body}`)
  getNextQuestion(req.body)
    .then(question => {
      console.log(`nextQuestion type: ${typeof (question)}`)
      return res.status(200).send(question)
    })
    .catch(console.error)
})
