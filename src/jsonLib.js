const fs = require('fs')

const arrData = JSON.parse(fs.readFileSync('items.json'))

module.exports.arrData = arrData
