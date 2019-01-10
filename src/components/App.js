import React, { Component } from 'react'
import axios from 'axios'
import QuestionView from './QuestionView'

class App extends Component {
  state = {
    items: []
    // image: ''
  }

  getImage = () => {
    axios.get('http://localhost:8000/question')
    .then(responce => {
      // console.log(`RESPONSE from SERVER\n${responce.data}`)
      this.setState({ items: responce.data })
    })
    .catch(err => {console.log('AXIOS ERROR', err)})
  }

  renderHelper() {
    if (this.state.items) {
      return <QuestionView arr={this.state.items} />
    }
  }
  render () {
    return (
      <div className='ui container'>
        <div className='ui segment'>
          <div className='ui header'>
            HELLO
          </div>
          <button className='ui button' onClick={this.getImage}>
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
