const dotenv = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { getQuestion, getNextQuestion, getPlace } = require('./src/servLib')
const { arrData, ratingData } = require('./src/jsonLib')

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
<<<<<<< HEAD
  console.log(`We Are Live on ${port}!`)
})

app.get('/question', (req, res) => {
=======
  console.log(`We Are Live on ${port} port!`)
})

app.get('/question', (req, res) => {
  console.log('have a /QUESTION request')
>>>>>>> boot
  try {
    const question = getQuestion(arrData)
    return res.send(question)
  } catch (e) {
    console.error(e)
    return res.sendStatus(500)
  }
})

app.post('/nextQuestion', (req, res) => {
  if (!req.body) return res.status(500).send('idi v pezdu')
  try {
    const nextQuestion = getNextQuestion(req.body, arrData)
    return res.send(nextQuestion)
  } catch (e) {
    console.error(e)
    return res.sendStatus(500)
  }
})

app.post('/getPlace', (req, res) => {
  try {
    const place = getPlace(req.body.value, ratingData)
    return res.send(place)
  } catch (e) {
    console.error(e)
  }
})
