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
      const questionItem = {
        name: item.name,
        avatar: item.avatar
      }
      const rightAnsPairs = []
      const wrongAnsPairs = []
      for (let t = 0; t < item.partOf.length; t += 1) {
        let pair = {
          name: item.partOf[t].nameOf,
          avatar: item.partOf[t].ava
        }
        rightAnsPairs.push(pair)
      }
      for (let y = rightAnsPairs.length; y < 8; y += 1) {
        let rr = rrr()
        const rItem = resp[rr]
        const pair = {
          name: rItem.name,
          avatar: rItem.avatar
        }
        wrongAnsPairs.push(pair)
      }
      const oneQuestion = rightAnsPairs.concat(wrongAnsPairs)
      oneQuestion.push(questionItem)
      resolve(oneQuestion)
      console.log('question length: ', oneQuestion.length)
    })
    coll.catch(() => {
      reject(console.error)
    })
  })
}

module.exports.getQuestion = getQuestion
