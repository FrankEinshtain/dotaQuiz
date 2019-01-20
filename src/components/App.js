import React, { Component } from 'react'
import axios from 'axios'
import QuestionView from './QuestionView'

const { REACT_APP_API_URL, REACT_APP_QUESTIONS_AMOUNT } = process.env

class App extends Component {
  state = {
    startTime: null,
    finishTime: null,
    question: null,
    draftAnswers: null,
    items: [],
    answers: [],
    finish: 0
  }

  setStartTime = () => {
    this.setState({ startTime: new Date().getTime() })
  }

  getQuizTime = () => {
    const { startTime, finishTime } = this.state
    const diffTime = new Date(finishTime - startTime).getTime()
    const ms = diffTime % 1000
    const allSec = Math.floor(diffTime / 1000)
    const min = Math.floor(allSec / 60)
    const sec = allSec - (min * 60)
    const quizTime = `${min}:${sec}.${ms}`
    const questionTime = Math.floor(diffTime / REACT_APP_QUESTIONS_AMOUNT)
    const questionMs = questionTime % 1000
    const questionSec = Math.floor(questionTime / 1000)
    const questionTimeString = `${questionSec}.${questionMs}`
    return (
      startTime && !finishTime
        ? <div>
          <p>LOADING...</p>
          <p>LOL..KEK..</p>
        </div>
        : <div>
          <p>общее время квиза: {quizTime}</p>
          <p>среднее время ответа: {questionTimeString}</p>
        </div>
    )
  }

  getFirstQuestion = () => {
    this.setState({ startTime: null, finishTime: null })
    this.getQuestion()
    this.setStartTime()
  }

  getQuestion = () => {
    axios.get(`${REACT_APP_API_URL}/question`)
      .then(response => {
        const { question, answers } = response.data
        this.setState({
          question,
          draftAnswers: answers,
          finish: 0
        })
      })
      .catch(console.error)
  }

  getNextQuestion = clickedButts => {
    const clButts = clickedButts.map(item => item[1])
    this.setState({ answers: clButts })
    const qItem = this.state.question
    const answerToServer = {
      question: qItem.name,
      answers: clButts
    }

    axios.post(`${REACT_APP_API_URL}/nextQuestion`, answerToServer)
      .then(response => {
        if (typeof (response.data) === 'number') {
          const finishTime = new Date().getTime()
          this.setState({ finish: response.data, finishTime, answers: [], question: null, draftAnswers: null })
        } else if (typeof (response.data) === 'object') {
          const { question, answers } = response.data
          this.setState({ question, draftAnswers: answers, answers: [] })
        }
      })
      .catch(console.error)
  }

  renderHelper() {
    const { question, draftAnswers, answers, finish } = this.state
    if (finish === 0 && answers.length === 0 && !question) {
      return (
        <div className='ui segment'>
          <div className='ui header'>
            Что можно собрать, используя этот предмет?
          </div>
          <button className='ui button' onClick={this.getFirstQuestion}>
            GO!
          </button>
        </div>
      )
    } else if (finish > 0 && answers.length === 0 && !question) {
      return (
        <div className='ui segment'>
          <div className='ui header'>
            <p>количество правильных ответов: {this.state.finish}</p>
            {this.getQuizTime()}
          </div>
          <button className='ui button' onClick={this.getFirstQuestion}>
            AGAIN?
          </button>
        </div>
      )
    } else {
      return (
        <div className='ui segment'>
          <QuestionView
            getNext={this.getNextQuestion}
            question={question}
            draftAnswers={draftAnswers}
          />
        </div>
      )
    }
  }
  render() {
    return (
      <div className='ui container'>
        <div>
          {this.renderHelper()}
        </div>
      </div>
    )
  }
}

export default App
