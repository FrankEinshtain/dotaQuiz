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
  return random.int(0, 8)
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
  console.log('got answer for one question from user:\n', answrs)
  checkAnswer(answrs, data)
  questionCounter += 1
  if (questionCounter <= QUESTIONS_AMOUNT) {
    return getQuestion(data)
  } else {
    questionCounter = 0
    const out = rightAnsw.length
    rightAnsw = []
    console.log('### right answers: ', rightAnsw)
    console.log('### right answersOUT: ', out)
    return '' + out
  }
}

const checkAnswer = (answer, data) => {
  const { question, answers } = answer
  console.log('userAnswersforOneQuestion:\n', answer)
  console.log('userAnswersforOneQuestion QUESTION ITEM:\n', question)
  console.log('userAnswersforOneQuestion Answers:\n', answers)
  // console.log('general amount of right\nanswers after one question: ', rightAnsw.length)
  // const questionItem = question
  // console.log('question Item: ', questionItem)
  const toCheck = answers
  const separateAnswers = data.filter(item => item.name === question)
  const etalonAnswers = separateAnswers[0].partOf.map(part => {
    return part.nameOf
  })
  console.log('right answers for one questions: ', etalonAnswers)
  toCheck.forEach(el => {
    if (etalonAnswers.some(answer => answer === el)) {
      rightAnsw.push(el)
    }
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
