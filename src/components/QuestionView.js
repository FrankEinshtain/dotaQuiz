<<<<<<< HEAD
import React from 'react'
import QuestionButt from './QuestionButt'

class QuestionView extends React.Component {
=======
import React, { Component, Fragment } from 'react'
import QuestionButt from './QuestionButt'

class QuestionView extends Component {
>>>>>>> boot
  state = {
    clickedButts: []
  }

<<<<<<< HEAD
  handleClick = (data) => {
    const { clickedButts } = this.state
    if (data[1] !== '') {
      let pushData = [data[0], data[1]]
      clickedButts.push(pushData)
      this.setState({ clickedButts })
    }
    if (data[1] === '') {
      let newButtData = clickedButts.filter(clickedButt => clickedButt[0] !== data[0])
=======
  removeChildren = (elem) => {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }
  buttonToggle = () => {
    return this.state.clickedButts.length
      ? 'btn btn-secondary next-quest-butt'
      : 'disabled btn btn-secondary next-quest-butt'
  }

  handleClick = (z, name) => {
    const { clickedButts } = this.state
    if (name !== '') {
      clickedButts.push({ z, name })
      this.setState({ clickedButts })
    }
    if (name === '') {
      let newButtData = clickedButts.filter(clickedButt => clickedButt.z !== z)
>>>>>>> boot
      this.setState({ clickedButts: newButtData })
    }
  }

<<<<<<< HEAD
  removeChildren = (elem) => {
    while (elem.lastChild) {
      elem.removeChild(elem.lastChild);
    }
  }

  getNextQuest = () => {
=======
  onNextQuestionClick = (e) => {
    e.preventDefault()
>>>>>>> boot
    const { getNext } = this.props
    const { clickedButts } = this.state
    getNext(clickedButts)
    this.setState({ clickedButts: [] })
    this.removeChildren(QuestionView)
  }

<<<<<<< HEAD
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
          isClicked='tiny ui image'
=======
  render() {
    const { question, answers } = this.props
    const answsReady = answers.map((answer, index) => {
      return (
        <QuestionButt
          mamaClick={this.handleClick}
          answer={answer}
          key={index + answer.name}
          z={index + answer.name}
          isClicked='btn img-answer'
>>>>>>> boot
          clickName=''
        />
      )
    })
<<<<<<< HEAD

    const firstLine = outArr.slice(0, 4)
    const secondLine = outArr.slice(4)

    return (
      <div className='ui container'>
        <div className='ui tiny images'>
          <h1>{question.name}</h1>
          <img
            src={`data:image/jpeg;base64,${question.ava}`}
            alt={question.name}
          />
        </div>
        <div className='ui segment'>
          <div className='ui tiny images'>
            {firstLine}
          </div>
          <div className='ui tiny images'>
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
=======
    return (
      <Fragment>
        <div className='row'>
          <div className='col-6 question-box'>
            <div className='card'>
              <h5 className='card-header'>{question.name}</h5>
              <div className='card-body'>
                <img
                  className='img-question'
                  src={`data:image/jpeg;base64,${question.ava}`}
                  alt={question.name}
                />
              </div>
              <div className='card-footer'>
                <div>
                  <a
                    href="#"
                    className={this.buttonToggle()}
                    onClick={e => this.onNextQuestionClick(e)}
                  >
                    Next Question
              </a>
                </div>
              </div>
            </div>
          </div>

          <div className='col-6'>
            <div className='row answer-box'>
              {answsReady}
            </div>
          </div>
        </div>
      </Fragment >
>>>>>>> boot
    )
  }
}

export default QuestionView
