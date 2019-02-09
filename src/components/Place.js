import React, { Component, Fragment } from 'react'
import axios from 'axios'
const { REACT_APP_API_URL } = process.env

class Place extends Component {
  state = {
    place: 0
  }

  getPlace = (props) => {
    const { rating } = this.props
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
