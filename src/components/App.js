import React, { Component } from 'react'
import axios from 'axios'
import QuestionView from './QuestionView'
import Place from './Place'

const { REACT_APP_API_URL, REACT_APP_QUESTIONS_AMOUNT } = process.env

class App extends Component {
  state = {
    startTime: null,
    finishTime: null,
    question: null,
    draftAnswers: null,
    answers: [],
    stats: {},
    place: null
  }

  setStartTime = () => {
    this.setState({ startTime: new Date().getTime() })
  }

  getPlace = (rating) => {
    // axios.post(`${REACT_APP_API_URL}/getPlace`, { value: rating })
    // .then(response => {
    //   console.log('place from server', response.data.value)
      return <Place rating={rating} />
      // this.setState({ place: response.data.value })

      // if (this.state.place) {
      //   return (
      //     <div>
      //       <p>{response.data.value}</p>
      //     </div>
      //   )
      // }
    // })
    // .catch(console.error)

}


  getStatistics = () => {
    const { startTime, finishTime } = this.state
    const { right, total, missed } = this.state.stats
    const diffTime = new Date(finishTime - startTime).getTime()
    console.log('diffTime: ', diffTime)
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
    console.log('rightPresent: ', (rightPercent * 100))
    const rating = 100000 - (Math.floor(questionTime * rightPercent))
    const place = this.getPlace(rating)
    // this.setState({ rating: rating })
      return (
        //   !finishTime
        //   ? <div>
        //     <p>LOADING...</p>
        //     <p>LOL..KEK..</p>
        //   </div>
        //   :
          <div>
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
    this.setState({ startTime: null, finishTime: null, stats: {} })
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
        if (response.data.stats && response.data.stats.right) {
          const finishTime = new Date().getTime()
          this.setState({
            stats: response.data.stats,
            finishTime,
            answers: [],
            question: null,
            draftAnswers: null
          })
        } else {
          const { question, answers } = response.data
          this.setState({
            question,
            draftAnswers: answers,
            answers: []
          })
        }
      })
      .catch(console.error)
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
    )
  }
}

export default App
