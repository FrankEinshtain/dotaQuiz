import React, { Component } from 'react'
import axios from 'axios'
import QuestionView from './QuestionView'

class App extends Component {
  state = {
    items: [],
    answers: []
  }

  getQuestion = () => {
    axios.get('http://localhost:8000/question')
    .then(responce => {
      // console.log(`RESPONSE from SERVER\n${responce.data}`)
      this.setState({ items: responce.data })
    })
    .catch(err => {console.log('AXIOS ERROR', err)})
  }

  getNextQuestion = (e) => {
    // let clButts = this.state.clickedButts
    let clButts = e.map(item => {return item[1]})
    this.setState({ answers: clButts })
    const qItem = this.state.items[0]
    // const answrFin = clButts.unshift(qItem[0])
    clButts.unshift(qItem[0])
    console.log('nextQ2Server: ', clButts)
    axios.post('http://localhost:8000/nextQuestion', clButts)
    .then(responce => {
      this.setState({ items: responce.data, answers: [] })
    })
  }

  renderHelper() {
    if (this.state.items) {
      return <QuestionView getNext={this.getNextQuestion} arr={this.state.items} />
    }
  }
  render () {

    return (
      <div className='ui container'>
        <div className='ui segment'>
          <div className='ui header'>
            HELLO
          </div>
          <button className='ui button' onClick={this.getQuestion}>
            GO!
          </button>
          <div>
            {this.renderHelper()}
          </div>

        </div>
      </div>
    )
  }
}

export default App
