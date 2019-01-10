import React from 'react'

class QuestionView extends React.Component {
  render () {
    const inArr = this.props.arr
    // inArr[8]
    // const first = inArr.pop()
    // console.log('Q ITEM: ', first)

    const qItem = () => {
      let n = this.props.arr[1].name
      let a = this.props.arr[1].avatar
      return (
        <div className='ui segment' >
          <h1>{n}</h1>
          <img
            src={`data:image/jpeg;base64,${a}`}
            alt={n}
          />
        </div>
      )
    }

    const outArr = inArr.map(item => {
      return (
        <div>
          <img
            src={`data:image/jpeg;base64,${item.avatar}`}
            alt={item.name}
          />
        </div>
      )
    })
    return (
      <div className='ui container'>.
        {qItem()}
        <div className='ui segment'>
          {outArr}
        </div>
      </div>
    )
  }
}

export default QuestionView
