const dotenv = require('dotenv').config()
const random = require('random')

const {
  QUESTIONS_AMOUNT,
  MAX_ANSWERS
} = process.env

let questionCounter = 0
let rightAnsw = []

const rrr = (lastItem) => {
  return random.int(0, lastItem - 1)
}

const randSort = (a, b) => {
  return random.int(0, 7)
}

const getRandomItem = (resp) => {
  const dig = rrr(resp.length)
  const itm = resp[dig]
  return itm.partOf.length === 0
    ? getRandomItem(resp)
    : itm
}

const getQuestion = (data) => {
  const item = getRandomItem(data)
  const questionItem = {
    question: {
      name: item.name,
      ava: item.avatar
    },
    answers: []
  }
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
  questionItem.answers.push(...answers)
  return questionItem
}

const getNextQuestion = (answrs, data) => {
  console.log('answer length: ', answrs)
  checkAnswer(answrs, data)
  questionCounter += 1
  if (questionCounter <= QUESTIONS_AMOUNT) {
    return getQuestion(data)
  } else {
    questionCounter = 0
    console.log('### right answers: ', rightAnsw)
    return '' + rightAnsw.length
  }
}

const checkAnswer = (answer, data) => {
  const questionItem = answer[0]
  const toCheck = answer.slice(1)
  const separateAnswers = data.filter(item => item.name === questionItem)
  const rightAnswers = separateAnswers[0].partOf.map(part => {
    return part.nameOf
  })
  toCheck.forEach(el => {
    rightAnswers.forEach(answ => {
      if (el === answ) {
        rightAnsw.push(el)
      }
    })
  })
}

const getRandomAnswer = data => {
  const rr = rrr(data.length)
  const rItem = data[rr]
  return {
    name: rItem.name,
    ava: rItem.avatar
  }
}

module.exports = {
  getQuestion,
  getNextQuestion
}
