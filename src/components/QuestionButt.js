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
    )
  }
}

export default QuestionButt
