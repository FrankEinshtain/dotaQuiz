import React, { Component } from 'react'
import axios from 'axios'

class App extends Component {
  state = {
    image: ''
  }

  getImage = () => {
    axios.get('http://localhost:8000/question')
    .then(responce => {
      // console.log(`RESPONSE from SERVER\n${responce.data}`)
      this.setState({ image: responce.data })
    })
    .catch(err => {console.log('AXIOS ERROR', err)})
  }

  renderHelper() {
    if (this.state.image) {
      return <img src={`data:image/jpeg;base64,${this.state.image}`} />
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
