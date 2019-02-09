<<<<<<< HEAD
import React from 'react'
import axios from 'axios'
const { REACT_APP_API_URL } = process.env

class Place extends React.Component {
=======
import React, { Component, Fragment } from 'react'
import axios from 'axios'
const { REACT_APP_API_URL } = process.env

class Place extends Component {
>>>>>>> boot
  state = {
    place: 0
  }

  getPlace = (props) => {
    const { rating } = this.props
<<<<<<< HEAD
    console.log('rating after finish', rating)
  axios.post(`${REACT_APP_API_URL}/getPlace`, { value: +(rating.toFixed(2)) })
    .then(response => {
      this.setState({ place: response.data.value })
      console.log('place from server', response.data.value)
    })
    .catch(console.error)
}

showPlace = () => {
  return this.state.place
  ? this.state.place
  : 'ща узнаем'
}

componentDidMount() {
  this.getPlace()
}

render() {
  return (
    <div>
      <p>место: {this.showPlace()}</p>
    </div>
  )
}
}

export default Place
=======
    axios.post(`${REACT_APP_API_URL}/getPlace`, { value: +(rating.toFixed(2)) })
      .then(response => {
        this.setState({ place: response.data.value })
      })
      .catch(console.error)
  }

  showPlace = () => {
    return this.state.place
      ? this.state.place
      : 'ща узнаем'
  }

  componentDidMount() {
    this.getPlace()
  }

  render() {
    return (
      <Fragment>
            {this.showPlace()}
      </Fragment>
    )
  }
}

export default Place
>>>>>>> boot
