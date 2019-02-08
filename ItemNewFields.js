const { arrData } = require('./src/jsonLib')
const fs = require('fs')
const Promise = require('bluebird')
Promise.config({
  longStackTraces: true,
  warnings: true
})
const MongoClient = require('mongodb').MongoClient
const mongUrl = 'mongodb://localhost:27017/'
const mongoClient = new MongoClient(mongUrl, { keepAlive: true, useNewUrlParser: true })
mongoClient.connect((err, client) => {
  if (err) {
    return console.log(err)
  }
  console.log('Mongo Is OnLine')
  // console.log(arrData.length)
  const db = client.db('test')
  const collection = db.collection('items')

  const arrDataNew = Promise.map(arrData, item => getNewItem(item), { concurrency: 1 })
  const getNewItem = item => {
    return new Promise((resolve, reject) => {
      if (err) reject(console.error(err))
      collection.findOne({ name: item.name }, (err, candidateItem) => {
        if (err) return console.error(err)
        if (candidateItem.consistsOf.length === 0) {
          resolve(item)
        }
        if (candidateItem.consistsOf.length !== 0) {
          let consistItemsArr = []
          item.consistsOf = []
          candidateItem.consistsOf.forEach(consistent => {
            const avaType = typeof (consistent.ava)
            const consistItem = {
              nameOf: consistent.nameOf,
              ava: ''
            }
            if (avaType === 'object') {
              console.log('Ava Is NULL: ', consistent.nameOf)
            } else {
              consistItem.ava = consistent.ava
            }
            consistItemsArr.push(consistItem)
          })
          item.consistsOf = consistItemsArr
          resolve(item)
        }
      })
    })
  }
  arrDataNew
    .then(result => {
      console.log('arrDataNew length', result.length)
      const content = JSON.stringify(result, null, 2)
      fs.writeFileSync('./items2.json', content, 'utf8')
    }).catch(console.error)
})
