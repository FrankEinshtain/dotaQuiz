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

const getRandomImage = () => {
  let collection = db.collection('items')
  // let one = collection.countDocuments()
  // return console.log(one)
  return new Promise((resolve, reject) => {
    let coll = collection.find({}, { name: 1, avatar: 1, _id: 0 }).toArray()
    coll.then(resp => {
      let num = Math.floor(Math.random() * 175)
      resolve(resp[num].avatar)
    })
    coll.catch(() => {
      reject(console.error)
    })
  })
}

// const getRandomImage = () => {
//   let collection = db.collection('items')
//   return new Promise((resolve, reject) => {
//     collection.find({ name: 'Cheese' }, { name: 1, avatar: 1, _id: 0 }, (err, resp) => {
//       if (err) { reject(console.log(`FUCK YOU ERROR!!!\n${err}`)) }
//       let one = resp.avatar
//       resolve(one)
//     })
//   })
// }

module.exports.getRandomImage = getRandomImage
