const random = require('random')
const MongoClient = require('mongodb').MongoClient
const dbUrl = 'mongodb://localhost:27017/test'
let db = {}
const mongoClient = new MongoClient(dbUrl, {
  useNewUrlParser: true
})
mongoClient.connect((err, database) => {
  if (err) { return console.log(err) }
  db = database.db('test')
})

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
  const collection = db.collection('items')
  return new Promise((resolve, reject) => {
    const coll = collection.find({}).toArray()
    coll.then(resp => {
      const dataArr = resp
      const item = getRandomItem(dataArr)
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
        const rItem = resp[rr]
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
      console.log('question length: ', oneQuestion.length)
    })
    coll.catch(() => {
      reject(console.error)
    })
  })
}

const getNextQuestion = (answrs) => {
  console.log('answer length: ', answrs)
  return getQuestion()
  // .then(q => { return q })
  // .catch(() => console.error)
}

module.exports.getQuestion = getQuestion
module.exports.getNextQuestion = getNextQuestion
