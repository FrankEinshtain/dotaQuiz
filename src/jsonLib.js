const fs = require('fs')

let arrData = []
try {
  const items = fs.readFileSync('items2.json')
  arrData = JSON.parse(items)
} catch (e) {
  console.error(e)
}

let ratingData = []
try {
  const rating = fs.readFileSync('rating.json')
  ratingData = JSON.parse(rating)
} catch (e) {
  console.error(e)
}

module.exports = {
  arrData,
  ratingData
}
