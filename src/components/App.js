import React, { Component } from 'react'
import axios from 'axios'
import QuestionView from './QuestionView'

const { REACT_APP_API_URL } = process.env

class App extends Component {
  state = {
    question: null,
    draftAnswers: null,
    items: [],
    answers: [],
    finish: 0
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
    // FROM => [[name, ava],[name, ava],[name, ava],[name, ava]]
    // TO => { question: { name, ava }, answers: [{ name, ava }, { name, ava }, { name, ava }] }
  }

  getNextQuestion = clickedButts => {
    console.log('\nfrom user to getNextQuestion\n', clickedButts)
    const clButts = clickedButts.map(item => item[1])
    this.setState({ answers: clButts })
    const qItem = this.state.question
    // clButts.unshift(qItem.name)
    const answerToServer = {
      question: qItem.name,
      answers: clButts
    }

    // [name, name, name, name]

    axios.post(`${REACT_APP_API_URL}/nextQuestion`, answerToServer)
      .then(response => {
        // console.log(typeof (response.data))
        if (typeof (response.data) === 'number') {
          this.setState({ finish: response.data, answers: [], question: null, draftAnswers: null })
        } else if (typeof (response.data) === 'object') {
          console.log('response', response)
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
          <button className='ui button' onClick={this.getQuestion}>
            GO!
          </button>
        </div>
      )
    } else if (finish > 0 && answers.length === 0 && !question) {
      return (
        <div className='ui segment'>
          <div className='ui header'>
            RIGHT answers: {this.state.finish}
          </div>
          <button className='ui button' onClick={this.getQuestion}>
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
