import React, { Component } from 'react'
import axios from 'axios'
import QuestionView from './QuestionView'

class App extends Component {
  state = {
    items: [],
    answers: [],
    finish: 0
  }

  getQuestion = () => {
    axios.get('http://localhost:8000/question')
    .then(responce => {
      this.setState({ items: responce.data, finish: 0 })
    })
    .catch(err => {console.log('AXIOS ERROR', err)})
  }

  getNextQuestion = (e) => {
    let clButts = e.map(item => {return item[1]})
    this.setState({ answers: clButts })
    const qItem = this.state.items[0]
    clButts.unshift(qItem[0])

    axios.post('http://localhost:8000/nextQuestion', clButts)
    .then(responce => {
              // console.log(typeof (responce.data))
      if (typeof (responce.data) === 'number') {
        this.setState({ finish: responce.data, answers: [], items: [] })
      } else if (typeof (responce.data) === 'object') {
      this.setState({ items: responce.data, answers: [] })
      }
    })
    .catch(console.error)
  }

  renderHelper() {
    const { items, answers, finish } = this.state
    if (finish === 0 && answers.length === 0 && items.length === 0) {
      return <div className='ui segment'>
          <div className='ui header'>
            HELLO
          </div>
          <button className='ui button' onClick={this.getQuestion}>
            GO!
          </button>
        </div>
    }else if (finish > 0 && answers.length === 0 && items.length === 0) {
      return <div className='ui segment'>
          <div className='ui header'>
            RIGHT answers: {this.state.finish}
          </div>
          <button className='ui button' onClick={this.getQuestion}>
            AGAIN?
          </button>
        </div>
    }else if (finish === 0 && answers.length === 0 && items.length > 0) {
      return <div className='ui segment'>
      <QuestionView getNext={this.getNextQuestion} arr={this.state.items} />
      </div>
    }
  }
  render () {

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
