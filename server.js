const dotenv = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { getQuestion, getNextQuestion } = require('./src/servLib')
const { arrData } = require('./src/jsonLib')

const app = express()
const port = process.env.APP_PORT || 8000

app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.listen(port, () => {
  console.log(`We Are Live on ${port}!`)
})

app.get('/question', (req, res) => {
  try {
    const question = getQuestion(arrData)
    // console.log(question.answers.length)
    return res.send(question)
  } catch (e) {
    console.error(e)
    return res.sendStatus(500)
  }
})

app.post('/nextQuestion', (req, res) => {
  if (!req.body) return res.status(500).send('idi v pezdu')
  try {
    // console.log('got POST from front:\n', req.body)
    const nextQuestion = getNextQuestion(req.body, arrData)
    return res.send(nextQuestion)
  } catch (e) {
    console.error(e)
    return res.sendStatus(500)
  }
})

// app.get('/question', (req, res) => {
//   console.log(`I GOT A 'question' REQUEST`)
//   getQuestion()
//     .then(question => {
//       return res.status(200).send(question)
//     })
//     .catch(console.error)
// })

// app.post('/nextQuestion', (req, res) => {
//   // console.log(`I got a 'NEXT QUESTION' request`)
//   console.log(`I Got The Answers\n${req.body}`)
//   getNextQuestion(req.body)
//     .then(question => {
//       console.log(`nextQuestion type: ${typeof (question)}`)
//       return res.status(200).send(question)
//     })
//     .catch(console.error)
// })
