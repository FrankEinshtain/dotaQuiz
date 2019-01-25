const dotenv = require('dotenv').config()
const fs = require('fs')
const random = require('random')

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
  console.log('User Rating From Front: ', userRating)
  // console.log('User Rating before: ', ratingData)
  if (!ratingData.includes(userRating)) {
    ratingData.push(userRating)
    ratingData.sort(compare)
  }
  console.log('sorted userReytings: ', ratingData)
  const place = ratingData.indexOf(userRating)
  console.log('place: ', place)
  const content = JSON.stringify(ratingData, null, 2)
  fs.writeFileSync('./rating.json', content, 'utf8')
  return { value: place }
}

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
  fullQuestionItem.answers.push(...answers)
  return fullQuestionItem
}

const getNextQuestion = (answrs, data) => {
  checkAnswer(answrs, data)
  questionCounter += 1
  if (questionCounter < REACT_APP_QUESTIONS_AMOUNT) {
    return getQuestion(data)
  } else {
    const missedRight = etalonAnsw - rightAnsw
    // const rightPercent = rightAnsw / (totalAnsw + missedRight) * 100
    // console.log('Missed Right Answers: ', missedRight)
    // console.log('Right Answers Percent: ', rightPercent)
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
  // console.log('User Answers for One Question:\n', answer)
  console.log('User Answers Amount for One Question: ', answer.answers.length)
  console.log('Total User Answers Amount : ', totalAnsw)
  console.log('Total User RIGHT Answers Amount : ', rightAnsw)
  console.log('Total Etalon Answers: ', etalonAnsw)
}

module.exports = {
  getQuestion,
  getNextQuestion,
  getPlace,
  compare
}
