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
    let click = this.state.isClicked === 'disabled small ui image'
      ? 'small ui image'
      : 'disabled small ui image'
    let click2 = this.state.clickName === ''
      ? item.name
      : ''
    this.setState({ isClicked: click, clickName: click2 })
    mamaClick([z, click2])
  }

  render() {
    const { item } = this.props
    return (
      <img
        // key={this.props.key}
        className={this.state.isClicked}
        src={`data:image/jpeg;base64,${item.ava}`}
        alt={item.name}
        onClick={this.toggleClick}
      />
    )
  }
}

export default QuestionButt
