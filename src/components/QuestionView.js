import React from 'react'
import QuestionButt from './QuestionButt'

class QuestionView extends React.Component {
  state = {
    clickedButts: []
  }

  render() {
    const inArr = this.props.arr
    const first = inArr.slice(0, 1)
    const others = inArr.slice(1)

    const qItemOut = () => {
      let str2arr = first
        .join(',')
        .split(',')
      return (
        <div className='ui small images'>
          <h1>{str2arr[0]}</h1>
          <img
            src={`data:image/jpeg;base64,${str2arr[1]}`}
            alt={str2arr[0]}
          />
        </div>
      )
    }

    const handleClick = (data) => {
      let buttData = this.state.clickedButts
      if (data[1] !== '') {
        let pushData = [data[0], data[1]]
        buttData.push(pushData)
        this.setState({ clickedButts: buttData })
      }
      if (data[1] === '') {
        let newButtData = buttData.filter(clickedButt => clickedButt[0] !== data[0])
        this.setState({ clickedButts: newButtData })
      }
    }

    const removeChildren = (elem) => {
      while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
      }
    }

    const outArr = others.map((item, index) => {
      return (
        <QuestionButt
          mamaClick={handleClick}
          key={item[0]}
          z={index}
          item={item}
          isClicked='small ui image'
          clickName=''
        />
      )
    })

    const firstLine = outArr.slice(0, 4)
    const secondLine = outArr.slice(4)

    const getNextQuest = (clB) => {
      this.props.getNext(clB)
      this.setState({ clickedButts: [] })
      removeChildren(QuestionView)
    }

    return (
      <div className='ui container'>
        {qItemOut()}
        <div className='ui segment'>
          <div className='ui small images'>
            {firstLine}
          </div>
          <div className='ui small images'>
            {secondLine}
          </div>
        </div>
        <button
          className='ui button'
          onClick={e => getNextQuest(this.state.clickedButts)}
        >
          NEXT QUESTION
        </button>
      </div>
    )
  }
}

export default QuestionView
