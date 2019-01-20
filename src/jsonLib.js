const fs = require('fs')

let arrData = []
try {
  const items = fs.readFileSync('items.json')
  arrData = JSON.parse(items)
} catch (e) {
  console.error(e)
}

module.exports = {
  arrData
}
