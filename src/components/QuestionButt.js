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
    )
  }
}

export default QuestionButt

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
