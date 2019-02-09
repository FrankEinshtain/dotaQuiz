const dotenv = require('dotenv').config()
const fs = require('fs')
const random = require('random')
<<<<<<< HEAD

=======
>>>>>>> boot
const {
  REACT_APP_QUESTIONS_AMOUNT,
  MAX_ANSWERS
} = process.env

let questionCounter = 0
let rightAnsw = 0
let totalAnsw = 0
let etalonAnsw = 0

const compare = (a, b) => {
  return b - a
}

const getPlace = (userRating, ratingData) => {
  if (!ratingData.includes(userRating)) {
    ratingData.push(userRating)
    ratingData.sort(compare)
  }
  const place = ratingData.indexOf(userRating)
  const content = JSON.stringify(ratingData, null, 2)
  fs.writeFileSync('./rating.json', content, 'utf8')
  return { value: place }
}

<<<<<<< HEAD
const getRandomNumber = (lastItem) => {
  return random.int(0, lastItem - 1)
}

const randSort = (a, b) => {
  return random.int(0, 9)
}

const getRandomAnswer = data => {
  const rNumb = getRandomNumber(data.length)
  const rItem = data[rNumb]
  return {
    name: rItem.name,
    ava: rItem.avatar
  }
}

const getRandomItem = (data) => {
  const rNumb = getRandomNumber(data.length)
  const itm = data[rNumb]
  return itm.partOf.length === 0
    ? getRandomItem(data)
    : itm
}

const getQuestion = (data) => {
  const item = getRandomItem(data)
  const fullQuestionItem = {
=======
const randSort = (a, b) => {
  return random.int(0, 8)
}

var questionItem = null

const getRandomNumber = (lastItem) => {
  return random.int(0, lastItem - 1)
}

const getRandomItem = data => {
  const randomNumb = getRandomNumber(data.length)
  const randomItem = data[randomNumb]
  if (randomItem) {
    return randomItem
  }
}

const getRandomQuestion = data => {
  const randomItem = getRandomItem(data)
  return randomItem.partOf.length
    ? randomItem
    : getRandomQuestion(data)
}

const getRestAnswers = (data, answs, question) => {
  let randomAnswer = getRandomItem(data)
  if (!randomAnswer || question === randomAnswer.name) {
    getRestAnswers(data, answs)
  } else if (randomAnswer && answs.some(answ => answ.name === randomAnswer.name)) {
    getRestAnswers(data, answs)
  } else {
    answs.push({
      name: randomAnswer.name,
      ava: randomAnswer.avatar
    })
  }
}
const getQuestion = data => {
  const item = getRandomQuestion(data)
  questionItem = {
>>>>>>> boot
    question: {
      name: item.name,
      ava: item.avatar
    },
    answers: []
  }
<<<<<<< HEAD
  const answers = []
  for (let t = 0; t < item.partOf.length; t += 1) {
    answers.push({
      name: item.partOf[t].nameOf,
      ava: item.partOf[t].ava
    })
  }
  for (let y = answers.length; y < MAX_ANSWERS; y += 1) {
    let pair = getRandomAnswer(data)
    if (answers.length > 0 && answers.some(p => p.name === pair.name)) {
      pair = getRandomAnswer(data)
    }
    answers.push(pair)
  }
  answers.sort(randSort)
  fullQuestionItem.answers.push(...answers)
  return fullQuestionItem
}

const getNextQuestion = (answrs, data) => {
  checkAnswer(answrs, data)
=======
  const answs = []
  for (let i = 0; i < item.partOf.length; i += 1) {
    answs.push({
      name: item.partOf[i].nameOf,
      ava: item.partOf[i].ava
    })
  }
  for (let i = answs.length; i < MAX_ANSWERS; i += 1) {
    getRestAnswers(data, answs, questionItem.question.name)
  }
  const { answers } = questionItem
  answs.sort(randSort)
  answers.push(...answs)
  return questionItem
}

const getNextQuestion = (userAnswers, data) => {
  checkAnswer(userAnswers, data)
>>>>>>> boot
  questionCounter += 1
  if (questionCounter < REACT_APP_QUESTIONS_AMOUNT) {
    return getQuestion(data)
  } else {
    const missedRight = etalonAnsw - rightAnsw
    const out = {
      stats: {
        right: rightAnsw,
        total: totalAnsw,
        missed: missedRight
      }
    }
    questionCounter = 0
    rightAnsw = 0
    totalAnsw = 0
    etalonAnsw = 0
    return out
  }
}

const checkAnswer = (answer, data) => {
  const { question, answers } = answer
  totalAnsw += answer.answers.length
  const separateAnswers = data.filter(item => item.name === question)
  const etalonAnswers = separateAnswers[0].partOf.map(part => {
    return part.nameOf
  })
  etalonAnsw += etalonAnswers.length
  answers.forEach(answer => {
    if (etalonAnswers.some(etalonAnswer => etalonAnswer === answer)) {
      rightAnsw += 1
    }
  })
}

module.exports = {
  getQuestion,
  getNextQuestion,
  getPlace,
  compare
}
