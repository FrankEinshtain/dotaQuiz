import React, { Component, Fragment } from 'react'
import QuestionButt from './QuestionButt'

class QuestionView extends Component {
  state = {
    clickedButts: []
  }

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
      this.setState({ clickedButts: newButtData })
    }
  }

  onNextQuestionClick = (e) => {
    e.preventDefault()
    const { getNext } = this.props
    const { clickedButts } = this.state
    getNext(clickedButts)
    this.setState({ clickedButts: [] })
    this.removeChildren(QuestionView)
  }

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
          clickName=''
        />
      )
    })
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
    )
  }
}

export default QuestionView
