<<<<<<< HEAD
import React from 'react'

class QuestionButt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClicked: this.props.isClicked,
      clickName: this.props.clickName
    }
  }

  toggleClick = () => {
    const { item, mamaClick, z } = this.props
    let click = this.state.isClicked === 'disabled tiny ui image'
      ? 'tiny ui image'
      : 'disabled tiny ui image'
    let click2 = this.state.clickName === ''
      ? item.name
      : ''
    this.setState({ isClicked: click, clickName: click2 })
    mamaClick([z, click2])
  }

  render() {
    const { item } = this.props
    return (
      <a href='#' title={item.name}>
        <img
          className={this.state.isClicked}
          src={`data:image/jpeg;base64,${item.ava}`}
          alt={item.name}
          onClick={this.toggleClick}
        />
      </a>
=======
import React, { Component, Fragment } from 'react'

class QuestionButt extends Component {
  state = {
    isClicked: this.props.isClicked,
    clickedName: this.props.clickName
  }

  toggleClick = () => {
    const { answer, z, mamaClick } = this.props
    const { isClicked, clickedName } = this.state
    let click = isClicked === 'btn disabled img-answer'
      ? 'btn img-answer'
      : 'btn disabled img-answer'
    let click2 = clickedName === ''
      ? answer.name
      : ''
    this.setState({ isClicked: click, clickedName: click2 })
    mamaClick(z, click2)
  }

  render() {
    const { answer, z } = this.props
    return (
      <Fragment>
        <label htmlFor={z}>
          <img
            id={z}
            onClick={this.toggleClick}
            className={this.state.isClicked}
            src={`data:image/jpeg;base64,${answer.ava}`}
            alt={answer.name}
          />
        </label>
      </Fragment>
>>>>>>> boot
    )
  }
}

export default QuestionButt
<<<<<<< HEAD

// render() {
//   const { item } = this.props
//   return (
//     <img
//       className={this.state.isClicked}
//       src={`data:image/jpeg;base64,${item.ava}`}
//       alt={item.name}
//       onClick={this.toggleClick}
//     />
//   )
// }
=======
>>>>>>> boot
