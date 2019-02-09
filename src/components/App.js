<<<<<<< HEAD
import React, { Component } from 'react'
=======
import './app.css'
import React, { Component, Fragment } from 'react'
>>>>>>> boot
import axios from 'axios'
import QuestionView from './QuestionView'
import Place from './Place'

const { REACT_APP_API_URL, REACT_APP_QUESTIONS_AMOUNT } = process.env

class App extends Component {
  state = {
<<<<<<< HEAD
    startTime: null,
    finishTime: null,
    question: null,
    draftAnswers: null,
    answers: [],
=======
    question: null,
    answers: null,
    userAnswers: null,
    startTime: null,
    finishTime: null,
>>>>>>> boot
    stats: {},
    place: null
  }

  setStartTime = () => {
    this.setState({ startTime: new Date().getTime() })
  }

<<<<<<< HEAD
  getPlace = (rating) => {
    return <Place rating={rating} />
  }


=======
>>>>>>> boot
  getStatistics = () => {
    const { startTime, finishTime } = this.state
    const { right, total, missed } = this.state.stats
    const diffTime = new Date(finishTime - startTime).getTime()
    const ms = diffTime % 1000
    const allSec = Math.floor(diffTime / 1000)
    const min = Math.floor(allSec / 60)
    const sec = allSec - (min * 60)
    const quizTime = `${min}:${sec}.${ms}`
    const questionTime = Math.floor(diffTime / REACT_APP_QUESTIONS_AMOUNT)
    const questionMs = questionTime % 1000
    const questionAllSec = Math.floor(questionTime / 1000)
    const questionMin = Math.floor(questionAllSec / 60)
    const questionSec = questionAllSec - (questionMin * 60)
    const questionTimeString = `${questionMin}:${questionSec}.${questionMs}`
    const rightPercent = right / (total + missed)
    const rating = 100000 - (Math.floor(questionTime * rightPercent))
<<<<<<< HEAD
    const place = this.getPlace(rating)
    return (
      !finishTime
        ? <div>
          <p>LOADING...</p>
          <p>LOL..KEK..</p>
        </div>
        : <div>
          <p>общее время квиза: {quizTime}</p>
          <p>среднее время ответа: {questionTimeString}</p>
          <p>количество правильных ответов: {right}</p>
          <p>{`правильность: ${Math.floor(rightPercent * 100)}%`}</p>
          <p>рейтинг: {rating}</p>
          {place}
        </div>
    )
  }

  getFirstQuestion = () => {
=======

    const statNames = [
      'общее время:',
      'среднее время ответа:',
      'правильных ответов:',
      'правильность:',
      'рейтинг:',
      'место '
    ]

    const statData = [
      quizTime,
      questionTimeString,
      right,
      `${Math.floor(rightPercent * 100)}%`,
      rating,
      <Place rating={rating} />
    ]

    let statOut = []
    for (let i = 0; i < statNames.length; i += 1) {
      const out = (
        <tr key={i}>
          <td className='text-right'>
            <h5>{statNames[i]}</h5>
          </td>
          <td className='text-left'>
            <h5><span className='badge badge-secondary'>
              {statData[i]}
            </span></h5>
          </td>
        </tr>
      )
      statOut.push(out)
    }

    return (
      !finishTime
        ? (
          <div>
            <p>LOADING...</p>
            <p>LOL..KEK..</p>
          </div>
        )
        : (
          <table className='table table-condensed table-hover'>
            <tbody>
              {statOut}
            </tbody>
          </table>
        )
    )
  }

  getFirstQuestion = e => {
    e.preventDefault()
>>>>>>> boot
    this.setState({ startTime: null, finishTime: null, stats: {} })
    this.getQuestion()
    this.setStartTime()
  }

  getQuestion = () => {
    axios.get(`${REACT_APP_API_URL}/question`)
      .then(response => {
        const { question, answers } = response.data
<<<<<<< HEAD
        this.setState({
          question,
          draftAnswers: answers,
        })
=======
        this.setState({ question, answers })
>>>>>>> boot
      })
      .catch(console.error)
  }

  getNextQuestion = clickedButts => {
<<<<<<< HEAD
    const clButts = clickedButts.map(item => item[1])
    this.setState({ answers: clButts })
    const qItem = this.state.question
    const answerToServer = {
      question: qItem.name,
      answers: clButts
    }

    axios.post(`${REACT_APP_API_URL}/nextQuestion`, answerToServer)
=======
    const pickedNames = clickedButts.map(clickedButt => clickedButt.name)
    const answer2server = {
      question: this.state.question.name,
      answers: pickedNames
    }
    axios.post(`${REACT_APP_API_URL}/nextQuestion`, answer2server)
>>>>>>> boot
      .then(response => {
        if (response.data.stats && response.data.stats.right) {
          const finishTime = new Date().getTime()
          this.setState({
<<<<<<< HEAD
            stats: response.data.stats,
            finishTime,
            answers: [],
            question: null,
            draftAnswers: null
=======
            question: null,
            answers: null,
            finishTime,
            stats: response.data.stats
>>>>>>> boot
          })
        } else {
          const { question, answers } = response.data
          this.setState({
            question,
<<<<<<< HEAD
            draftAnswers: answers,
            answers: []
=======
            answers,
            userAnswers: null
>>>>>>> boot
          })
        }
      })
      .catch(console.error)
<<<<<<< HEAD
  }

  renderHelper() {
    const { question, finishTime, draftAnswers, stats } = this.state
    if (!question && !stats.total) {
      return (
        <div className='ui segment'>
          <button className='ui button' onClick={this.getFirstQuestion}>
            GO!
          </button>
        </div>
      )
    }
    if (stats.total && finishTime) {
      return (
        <div className='ui segment'>
          <div className='ui header'>
            {this.getStatistics()}
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
        <div className='ui segment'>
          <div className='ui header'>
            <h2>Что можно собрать, используя этот предмет?</h2>
          </div>
        </div>
        <div>
          {this.renderHelper()}
        </div>
      </div>
=======

  }

  renderHelper = () => {
    const {
      question,
      answers,
      finishTime,
      stats
    } = this.state
    if (!question && !answers && !stats.total) {
      return (
        <Fragment>
          <h1 className='display-4'>Привет!</h1>
          <p className='blockquote'>Что можно собрать, используя этот предмет?</p>
          <p className='lead'>
            Как только ты нажмёшь GO, пойдёт отсчёт времени, так что торопись
            </p>
          <a
            type='button'
            className='btn btn-secondary'
            onClick={e => this.getFirstQuestion(e)}
          >
            GO!
          </a>
        </Fragment>
      )
    } else if (stats.total && finishTime) {
      return (
        <Fragment>
          <div className='row'>
            {this.getStatistics()}
          </div>
          <button className='btn btn-secondary' onClick={this.getFirstQuestion}>
            AGAIN?
          </button>
        </Fragment>
      )
    }
    if (question && answers) {
      return (
        <Fragment>
          <QuestionView
            question={question}
            answers={answers}
            getNext={this.getNextQuestion}
          />
        </Fragment>
      )
    }
  }

  render() {
    return (
      <Fragment>
        <div className='container'>
          <div className='jumbotron jumbotron-fluid bg-light'>
            {this.renderHelper()}
          </div>
        </div>
      </Fragment>
>>>>>>> boot
    )
  }
}

export default App
