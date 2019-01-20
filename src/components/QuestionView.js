import React from 'react'
import QuestionButt from './QuestionButt'

class QuestionView extends React.Component {
  state = {
    clickedButts: []
  }

  handleClick = (data) => {
    const { clickedButts } = this.state
    if (data[1] !== '') {
      let pushData = [data[0], data[1]]
      clickedButts.push(pushData)
      this.setState({ clickedButts })
    }
    if (data[1] === '') {
      let newButtData = clickedButts.filter(clickedButt => clickedButt[0] !== data[0])
      this.setState({ clickedButts: newButtData })
    }
  }

  removeChildren = (elem) => {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }

  getNextQuest = () => {
    const { getNext } = this.props
    const { clickedButts } = this.state
    getNext(clickedButts)
    this.setState({ clickedButts: [] })
    this.removeChildren(QuestionView)
  }

  buttonToggle = () => {
    return this.state.clickedButts.length
    ? 'ui button'
    : 'ui disabled button'
  }

  render() {
    const { question, draftAnswers } = this.props
    const outArr = draftAnswers.map((item, index) => {
      return (
        <QuestionButt
          mamaClick={this.handleClick}
          key={item.name + index}
          z={index}
          item={item}
          isClicked='small ui image'
          clickName=''
        />
      )
    })

    const firstLine = outArr.slice(0, 4)
    const secondLine = outArr.slice(4)

    return (
      <div className='ui container'>
        <div className='ui small images'>
          <h1>{question.name}</h1>
          <img
            src={`data:image/jpeg;base64,${question.ava}`}
            alt={question.name}
          />
        </div>
        <div className='ui segment'>
          <div className='ui small images'>
            {firstLine}
          </div>
          <div className='ui small images'>
            {secondLine}
          </div>
        </div>
        <button
          className={this.buttonToggle()}
          onClick={() => this.getNextQuest()}
        >
          NEXT QUESTION
        </button>
      </div>
    )
  }
}

export default QuestionView
