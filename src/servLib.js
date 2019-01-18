const random = require('random')
const { arrData } = require('./jsonLib')

let questionCounter = 0
// let wrongAnsw = 0
let rightAnsw = 0

const rrr = () => {
  return random.int(0, 174)
}
const randSort = (a, b) => {
  return random.int(-10, 10)
}

const getRandomItem = (resp) => {
  const dig = rrr()
  const itm = resp[dig]
  const answ = itm.partOf.length === 0
    ? getRandomItem(resp)
    : itm
  return answ
}

const getQuestion = () => {
  return new Promise((resolve, reject) => {
    const item = getRandomItem(arrData)
    const questionItem = [
      item.name,
      item.avatar
    ]
    const rightAnsPairs = []
    const wrongAnsPairs = []
    for (let t = 0; t < item.partOf.length; t += 1) {
      let pair = [
        item.partOf[t].nameOf,
        item.partOf[t].ava
      ]
      rightAnsPairs.push(pair)
    }
    for (let y = rightAnsPairs.length; y < 8; y += 1) {
      let rr = rrr()
      const rItem = arrData[rr]
      const pair = [
        rItem.name,
        rItem.avatar
      ]
      wrongAnsPairs.push(pair)
    }
    const oneQuestion = rightAnsPairs.concat(wrongAnsPairs)
    oneQuestion.sort(randSort)
    oneQuestion.unshift(questionItem)
    resolve(oneQuestion)
    // console.log('question length: ', oneQuestion.length)
  })
}

const getNextQuestion = (answrs) => {
  console.log('answer length: ', answrs)
  checkAnswer(answrs)
  questionCounter += 1
  if (questionCounter <= 3) {
    return getQuestion()
  } else {
    questionCounter = 0
    console.log('### right answers: ', rightAnsw)
    console.log('### wrong answers: ', wrongAnsw)
    return rightAnsw
  }
}

const checkAnswer = (answer) => {
  const questionItem = answer[0]
  const toCheck = answer.slice(1)
  const separateAnswers = arrData.filter(item => item.name === questionItem)
  // const arrObjAnswers = separateAnswers[0].partOf
  const rightAnswers = separateAnswers[0].partOf.map(item => {
    return item.nameOf
  })
  rightAnswers.forEach(el => {
    toCheck.forEach(answ => {
      if (el === answ) {
        rightAnsw += 1
      }
      // if (el !== answ) {
      //   wrongAnsw += 1
      // }
    })
  })
  // console.log('### to Check: ', toCheck)
  // console.log('&&& right Answers: ', rightAnswers)
}

module.exports.getQuestion = getQuestion
module.exports.getNextQuestion = getNextQuestion
