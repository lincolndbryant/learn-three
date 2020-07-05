import React from 'react'
import PropTypes from "prop-types";
import { ChromePicker } from 'react-color'

class ColorButton extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  }

  state = {
    displayColorPicker: false,
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  render() {
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div className="color-button">
        <div style={{backgroundColor: this.props.value, width: 60, height: 60, display: 'inline-block'}} />
        <button onClick={ this.handleClick }>Pick Color</button>
        { this.state.displayColorPicker ? <div style={ popover }>
          <div style={ cover } onClick={ this.handleClose }/>
          <ChromePicker color={this.props.value} onChange={this.props.onChange} />
        </div> : null }
      </div>
    )
  }
}

export default ColorButton
