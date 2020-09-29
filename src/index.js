import React, { Component } from 'react';


const DEFAULTS = {
  wrappedStyle: {
    background: '#fff',
    color: '#000',
    width: 200,
    fontSize: '17px',
    border: '1px solid #ccc',
    borderSpacing: '0px',
    maxWidth: '100%',
  },
  centerStyle: {
    border: 'none',
    borderLeft: '1px solid #ccc',
    borderRight: '1px solid #ccc',
  },
  buttonStyle: {
    width: 35,
    height: 35,
    background: '#eee',
    color: '#555',
    userSelect: 'none',
    fontSize: 'inherit',
  },
  inputStyle: {
    width: '40px',
    height: 35,
    lineHeight: `${35}px`,
    textAlign: 'center',
    border: 'none',
    outline: 'none',
    fontSize: 'inherit',
  },
}

export default class ReactNumPicker extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      value: this.props.min || 0,
      inputValue: this.props.min || 0,
    }
  }

  componentDidUpdate(prevProps, prevState, prevContext) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value,
        inputValue: this.props.value,
      });
    }
    if (this.props.min !== prevProps.min) {
      this.setState({
        min: this.props.min,
        value: this.props.min,
        inputValue: this.props.min,
      });
    }
  }

  onChange(type) {
    const { min, max } = this.props;
    const { value } = this.state;
    if (type === 'add') {
      const postValue = value + 1;
      if (max === undefined || postValue <= max) {
        this.setState({ value: postValue, inputValue: postValue });
      }
    } else {
      const postValue = value - 1;
      if (min === undefined || min !== undefined && postValue >= min) {
        this.setState({ value: postValue, inputValue: postValue });
      }
    }
  }

  onNumberChange(value) {
    this.setState({ inputValue: value });
  }

  onNumberBlur(value) {
    if (!isNaN(parseInt(value))) {
      this.setState({ value: parseInt(value), inputValue: parseInt(value) });
    } else {
      this.setState({ inputValue: this.state.value });
    }
  }

  render() {
    let {
      wrappedClass,
      wrappedStyle = {},
      centerStyle = {},
      buttonStyle = {},
      inputStyle = {},
      bordered,
      size = 35,
      borderColor = '#ccc',
      borderRadius = 0,
    } = this.props;
    const { inputValue } = this.state;

    if (bordered) {
      wrappedStyle.borderColor = borderColor;
      centerStyle.borderColor = borderColor;
    }

    if (borderRadius) {
      wrappedStyle.borderRadius = `${borderRadius}px`;
      wrappedStyle.overflow = 'hidden';
    }

    buttonStyle.width = size;
    buttonStyle.height = size;
    inputStyle.width = size * 1.5;
    inputStyle.height = size;
    inputStyle.lineHeight = `${size}px`;
    return (
      <table
        className={wrappedClass}
        style={{ ...DEFAULTS.wrappedStyle, ...wrappedStyle }}
      >
        <tbody>
        <tr>
          <td
            style={{ ...DEFAULTS.buttonStyle, ...buttonStyle }}
            onClick={() => this.onChange('subtract')}
          >
            -
          </td>
          <td style={{ ...DEFAULTS.centerStyle, ...centerStyle }}>
            <input
              value={inputValue}
              style={DEFAULTS.inputStyle}
              onBlur={event => this.onNumberBlur(event.target.value)}
              onChange={event => this.onNumberChange(event.target.value)}
            />
          </td>
          <td
            style={{ ...DEFAULTS.buttonStyle, ...buttonStyle }}
            onClick={() => this.onChange('add')}
          >
            +
          </td>
        </tr>
        </tbody>
      </table>
    );

  }

}
