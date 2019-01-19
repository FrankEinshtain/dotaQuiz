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
    let click = this.state.isClicked === 'disabled small ui image'
      ? 'small ui image'
      : 'disabled small ui image'
    let click2 = this.state.clickName === ''
      ? this.props.item[0]
      : ''
    this.setState({ isClicked: click, clickName: click2 })
    // console.log('buttName: ', click2)
    let dataOut = [this.props.z, click2]
    this.props.mamaClick(dataOut)
  }

  render() {
    return (
      <img
        key={this.props.key}
        className={this.state.isClicked}
        src={`data:image/jpeg;base64,${this.props.item[1]}`}
        alt={this.props.item[0]}
        onClick={this.toggleClick}
      />
    )
  }
}

export default QuestionButt
