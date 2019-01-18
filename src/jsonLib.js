const fs = require('fs')

const arrData = JSON.parse(fs.readFileSync('items.json'))
// console.log('###ANSWER IS: ', typeof (arrData))

module.exports.arrData = arrData
